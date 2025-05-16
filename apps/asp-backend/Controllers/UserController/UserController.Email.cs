using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using EtsZemun.Utilities;

namespace EtsZemun.Controllers.UserController;

public partial class UserController
{
    [Authorize]
    [HttpPost("confirm-email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [EnableRateLimiting(RateLimitingPolicies.EmailConfirmation)]
    public async Task<ActionResult> ConfirmEmail([FromQuery] string token)
    {
        var result = await userService.ConfirmEmail(User, token);

        if (result.IsFailed)
            return BadRequest(new { result.Errors[0].Message });

        return Ok();
    }

    [Authorize]
    [HttpPost("resend-confirmation-email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [EnableRateLimiting(RateLimitingPolicies.EmailConfirmation)]
    public async Task<ActionResult> ResendConfirmationEmail()
    {
        var result = await userService.ResendConfirmationEmail(User);

        if (result.IsFailed)
            return BadRequest(new { result.Errors[0].Message });

        return Ok();
    }
}
