using EtsZemun.Dtos.Response.Admin;
using EtsZemun.Services.Model.AdminService;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.AdminController;

[Authorize(Roles = Roles.BasicPerms)]
[Route("admin")]
[ApiController]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
[ProducesResponseType(StatusCodes.Status403Forbidden)]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public class AdminController(IAdminService adminService) : ControllerBase
{
    [HttpGet("overview")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<AdminOverviewResponseDto>> GetOverview()
    {
        var result = await adminService.GetOverview();

        if (result.IsFailed)
            return BadRequest(new { result.Errors[0].Message });

        return Ok(result.Value);
    }
}
