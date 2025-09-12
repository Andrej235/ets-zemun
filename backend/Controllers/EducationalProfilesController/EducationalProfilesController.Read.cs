using EtsZemun.Dtos.Response.EducationalProfile;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.EducationalProfilesController;

public partial class EducationalProfilesController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<SimpleEducationalProfileResponseDto>>> GetAll()
    {
        var result = await profileService.GetAll();

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<EducationalProfileResponseDto>> GetSingle(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await profileService.GetSingle(id, languageCode);

        if (result.IsFailed)
            return NotFound();

        return Ok(result.Value);
    }
}
