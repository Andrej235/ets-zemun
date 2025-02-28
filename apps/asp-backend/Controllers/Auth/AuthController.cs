using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Auth;
using EtsZemun.DTOs.Response.Auth;
using EtsZemun.Services.Mapping.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Hybrid;

namespace EtsZemun.Controllers.Auth
{
    [Route("auth")]
    [ApiController]
    public class AuthController(
        SignInManager<IdentityUser> signInManager,
        IResponseMapper<IdentityUser, FullUserResponseDto> responseMapper,
        HybridCache hybridCache
    ) : ControllerBase
    {
        private readonly SignInManager<IdentityUser> signInManager = signInManager;
        private readonly IResponseMapper<IdentityUser, FullUserResponseDto> responseMapper =
            responseMapper;
        private readonly HybridCache hybridCache = hybridCache;

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
        [HttpPut("change-role")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleRequestDto request)
        {
            var user = await signInManager.UserManager.FindByIdAsync(request.UserId);

            if (user is null)
                return NotFound();

            await signInManager.UserManager.RemoveFromRolesAsync(
                user,
                await signInManager.UserManager.GetRolesAsync(user)
            );
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
        public async Task<
            ActionResult<LazyLoadResponse<FullUserResponseDto>>
        > CheckForAllUserStatus([FromQuery] int? offset, [FromQuery] int? limit)
        {
            var users = await signInManager
                .UserManager.Users.Skip(offset ?? 0)
                .Take(limit ?? 10)
                .ToListAsync();

            var mapped = new List<FullUserResponseDto>();
            foreach (var user in users)
            {
                var current = responseMapper.Map(user);
                current.Role = await signInManager.UserManager.GetRolesAsync(user);
                mapped.Add(current);
            }

            LazyLoadResponse<FullUserResponseDto> result = new()
            {
                Items = mapped,
                TotalCount = await hybridCache.GetOrCreateAsync(
                    "users-count",
                    async (x) => await signInManager.UserManager.Users.CountAsync(x)
                ),
                LoadedCount = mapped.Count,
            };

            result.NextCursor =
                result.LoadedCount < (limit ?? 10)
                    ? null
                    : $"auth/user/all?offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}";

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUser([FromRoute] string userId)
        {
            var user = await signInManager.UserManager.FindByIdAsync(userId);
            if (user is null)
                return NotFound();

            await signInManager.UserManager.DeleteAsync(user);
            return NoContent();
        }
    }
}
