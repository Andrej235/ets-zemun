using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Dtos.Response.EducationalProfile;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.EducationalProfilesController;

public partial class EducationalProfilesController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<SimpleEducationalProfileResponseDto>> Create(
        [FromBody] CreateEducationalProfileRequestDto request
    )
    {
        var result = await profileService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created(null as string, result.Value);
    }
}
