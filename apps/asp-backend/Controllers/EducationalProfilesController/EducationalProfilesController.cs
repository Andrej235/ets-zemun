using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.DTOs.Response.EducationalProfile;
using EtsZemun.Services.Model.EducationalProfileService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.EducationalProfilesController;

[Route("profile")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public class EducationalProfilesController(IEducationalProfileService profileService)
    : ControllerBase
{
    private readonly IEducationalProfileService profileService = profileService;

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Create([FromBody] CreateEducationalProfileRequestDto request)
    {
        var result = await profileService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<EducationalProfileResponseDto>>> GetAll(
        [FromQuery] string languageCode
    )
    {
        var result = await profileService.GetAll(languageCode);

        if (result.IsFailed)
            return BadRequest(); //This can probably not ever occur (because, no language), but still feels weird to omit it

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

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update([FromBody] UpdateEducationalProfileRequestDto request)
    {
        var result = await profileService.Update(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await profileService.Delete(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
