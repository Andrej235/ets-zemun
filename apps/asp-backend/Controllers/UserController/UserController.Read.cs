using EtsZemun.Dtos.Response.User;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.UserController;

public partial class UserController
{
    [Authorize(Roles = Roles.Admin)]
    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<IEnumerable<AdminUserResponseDto>>> GetAll(
        [FromQuery] int offset,
        [FromQuery] int limit,
        [FromQuery] string? search
    )
    {
        var result = await userService.GetAll(offset, limit, search);

        if (result.IsFailed)
            return BadRequest(new { result.Errors[0].Message });

        return Ok(result.Value);
    }
}
