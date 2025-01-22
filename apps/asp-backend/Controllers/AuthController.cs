using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers
{
    public class AuthController : Controller
    {
        [HttpGet("auth/login")]
        public IActionResult Login()
        {
            var properties = new AuthenticationProperties { RedirectUri = "/test/redirect" };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("auth")]
        public async Task<IActionResult> GetUsername()
        {
            var result = await HttpContext.AuthenticateAsync(
                CookieAuthenticationDefaults.AuthenticationScheme
            );

            return Ok(result.Principal?.Claims.Select(x => x.Value));
        }
    }
}
