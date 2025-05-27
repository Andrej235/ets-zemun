using EtsZemun.Dtos.Request.User;
using EtsZemun.Dtos.Response.User;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace EtsZemun.Controllers.UserController;

public partial class UserController
{
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Register([FromBody] RegisterRequestDto request)
    {
        var result = await userService.Register(request);

        if (result.IsFailed)
            return BadRequest(new { result.Errors[0].Message });

        return Ok();
    }

    [Authorize]
    [HttpGet("me/role")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<UserResponseDto>> GetRole()
    {
        var user = await userService.GetRole(User);
        if (user.IsFailed)
            return BadRequest(new { user.Errors[0].Message });

        return Ok(user.Value);
    }

    [Authorize]
    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return Ok();
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<UserResponseDto>> Login([FromBody] LoginRequestDto request)
    {
        var result = await signInManager.PasswordSignInAsync(
            request.Username,
            request.Password,
            true,
            false
        );

        if (!result.Succeeded)
            return Unauthorized(new { Message = "Invalid username or password" });

        await userService.SaveLoginEvent(request.Username);

        return Ok();
    }

    [Authorize]
    [HttpGet("logged-in-only")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public Task<OkResult> Get() => Task.FromResult(Ok());

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("perms-only")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public Task<OkResult> GetPerms() => Task.FromResult(Ok());

    [Authorize(Roles = "Admin")]
    [HttpGet("admin-only")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public Task<OkResult> GetAdmin() => Task.FromResult(Ok());
}
