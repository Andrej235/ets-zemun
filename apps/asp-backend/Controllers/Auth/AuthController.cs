using EtsZemun.DTOs.Request.Auth;
using EtsZemun.DTOs.Response.Auth;
using EtsZemun.Services.Mapping.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Controllers.Auth
{
    [Route("auth")]
    [ApiController]
    public class AuthController(
        SignInManager<IdentityUser> signInManager,
        IResponseMapper<IdentityUser, FullUserResponseDto> responseMapper
    ) : ControllerBase
    {
        private readonly SignInManager<IdentityUser> signInManager = signInManager;
        private readonly IResponseMapper<IdentityUser, FullUserResponseDto> responseMapper =
            responseMapper;

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

        [Authorize(Roles = "Mod,Admin")]
        [HttpGet("admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public IActionResult CheckForAdminStatus()
        {
            return Ok();
        }

        [Authorize]
        [HttpGet("user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<GetUserResponseDto> CheckForUserStatus()
        {
            var userName = User.Identity?.Name;
            if (userName is null)
                return Unauthorized();

            return Ok(new GetUserResponseDto() { Username = userName });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("user/all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<List<GetUserResponseDto>>> CheckForAllUserStatus()
        {
            var users = await signInManager.UserManager.Users.ToListAsync();
            var mapped = users.Select(async x =>
            {
                var mapped = responseMapper.Map(x);
                mapped.Role = await signInManager.UserManager.GetRolesAsync(x);
                return mapped;
            });

            return Ok(mapped);
        }
    }
}
