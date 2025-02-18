using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Award;
using EtsZemun.DTOs.Response.Award;
using EtsZemun.Services.Model.AwardService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.AwardController;

[Route("award")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public class AwardController(IAwardService awardService) : ControllerBase
{
    private readonly IAwardService awardService = awardService;

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Create([FromBody] CreateAwardRequestDto request)
    {
        var result = await awardService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [HttpPost("translation")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateTranslation(
        [FromBody] CreateAwardTranslationRequestDto request
    )
    {
        var result = await awardService.CreateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<AwardResponseDto>>> GetAll(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit
    )
    {
        var result = await awardService.GetAll(languageCode, offset, limit);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AwardResponseDto>> GetById(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await awardService.GetSingle(id, languageCode);

        if (result.IsFailed)
            return NotFound();

        return Ok(result.Value);
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update([FromBody] UpdateAwardRequestDto request)
    {
        var result = await awardService.Update(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [HttpPut("translation")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> UpdateTranslation(
        [FromBody] UpdateAwardTranslationRequestDto request
    )
    {
        var result = await awardService.UpdateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await awardService.Delete(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{awardId:int}/translation/{languageCode:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteTranslation(int awardId, string languageCode)
    {
        var result = await awardService.DeleteTranslation(awardId, languageCode);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
