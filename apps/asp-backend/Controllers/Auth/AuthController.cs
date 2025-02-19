using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.Auth
{
    [Route("auth")]
    public class AuthController(SignInManager<IdentityUser> signInManager) : Controller
    {
        private readonly SignInManager<IdentityUser> signInManager = signInManager;

        [Authorize]
        [HttpDelete("logout")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }
    }
}
