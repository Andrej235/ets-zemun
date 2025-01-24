using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action(nameof(RedirectToMainPage), "Auth"),
            };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("redirect")]
        public IActionResult RedirectToMainPage()
        {
            return Redirect("https://localhost.com/ucenici");
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            // Sign the user out of the cookie authentication scheme
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("https://localhost.com");
        }

        [HttpGet]
        public async Task<IActionResult> GetUsername()
        {
            var result = await HttpContext.AuthenticateAsync(
                CookieAuthenticationDefaults.AuthenticationScheme
            );

            return Ok(result.Principal?.Claims.Select(x => x.Value));
        }

        [HttpGet("admin")]
        public async Task<IActionResult> Admin()
        {
            var result = await HttpContext.AuthenticateAsync(
                CookieAuthenticationDefaults.AuthenticationScheme
            );

            return result.Principal?.Claims.Any() ?? false ? Ok() : Unauthorized();
        }
    }
}
