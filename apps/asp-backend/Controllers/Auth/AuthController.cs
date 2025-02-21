using EtsZemun.DTOs.Request.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.Auth
{
    [Route("auth")]
    [ApiController]
    public class AuthController(SignInManager<IdentityUser> signInManager) : ControllerBase
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

        [Authorize(Roles = "Admin")]
        [HttpPatch("change-role")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleRequestDto request)
        {
            var user = await signInManager.UserManager.FindByIdAsync(request.UserId);

            if (user is null)
                return NotFound();

            await signInManager.UserManager.AddToRoleAsync(user, request.Role);
            return NoContent();
        }
    }
}
