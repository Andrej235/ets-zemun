using EtsZemun.Dtos.Request.EducationalProfile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.EducationalProfilesController;

public partial class EducationalProfilesController
{
    [Authorize(Roles = "Mod,Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Create([FromBody] CreateEducationalProfileRequestDto request)
    {
        var result = await profileService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }
}
