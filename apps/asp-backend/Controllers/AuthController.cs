using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            // Redirect to Google's login page
            var redirectUrl = Url.Action("GoogleCallback", "Auth");
            return Challenge(
                new AuthenticationProperties { RedirectUri = redirectUrl },
                GoogleDefaults.AuthenticationScheme
            );
        }

        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            // Retrieve user information from Google
            var authenticateResult = await HttpContext.AuthenticateAsync(
                CookieAuthenticationDefaults.AuthenticationScheme
            );

            if (!authenticateResult.Succeeded)
                return BadRequest(); // Handle failed authentication

            var claims = authenticateResult.Principal.Identities.FirstOrDefault()?.Claims;

            var email = claims?.FirstOrDefault(c => c.Type == "email")?.Value;
            var name = claims?.FirstOrDefault(c => c.Type == "name")?.Value;

            // Handle your user logic here (e.g., create or fetch user from the database)
            // ...

            return Ok(new { email, name });
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("/");
        }
    }
}
