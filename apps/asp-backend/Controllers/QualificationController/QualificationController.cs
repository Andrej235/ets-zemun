using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.DTOs.Response.Qualification;
using EtsZemun.Errors;
using EtsZemun.Services.Model.QualificationService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.QualificationController;

[Route("qualification")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public class QualificationController(IQualificationService qualificationService) : ControllerBase
{
    private readonly IQualificationService qualificationService = qualificationService;

    [Authorize(Roles = "Mod,Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Create([FromBody] CreateQualificationRequestDto request)
    {
        var result = await qualificationService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPost("translation")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> CreateTranslation(
        [FromBody] CreateQualificationTranslationRequestDto request
    )
    {
        var result = await qualificationService.CreateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<QualificationResponseDto>>> GetAll(
        [FromQuery] int languageId,
        [FromQuery] int? offset,
        [FromQuery] int? limit,
        [FromQuery] int? teacherId
    )
    {
        var result = await qualificationService.GetAll(languageId, offset, limit, teacherId);

        if (result.IsFailed)
            return BadRequest("Language not found");

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<QualificationResponseDto>> GetSingle(
        int id,
        [FromQuery] int languageId
    )
    {
        var result = await qualificationService.GetSingle(id, languageId);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound("Qualification not found");

            return BadRequest("Language not found");
        }

        return Ok(result.Value);
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPut("translation")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> UpdateTranslation(
        [FromBody] UpdateQualificationTranslationRequestDto request
    )
    {
        var result = await qualificationService.UpdateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await qualificationService.Delete(id);

        if (result.IsFailed)
            return NotFound("Qualification not found");

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpDelete("{qualificationId:int}/translation/{languageId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteTranslation(int qualificationId, int languageId)
    {
        var result = await qualificationService.DeleteTranslation(qualificationId, languageId);

        if (result.IsFailed)
            return NotFound("Qualification translation not found");

        return NoContent();
    }
}
