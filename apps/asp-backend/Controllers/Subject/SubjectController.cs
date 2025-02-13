using EtsZemun.DTOs.Request.Subject;
using EtsZemun.DTOs.Response.Subject;
using EtsZemun.Errors;
using EtsZemun.Services.Model.SubjectService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.Subject;

[Route("subject")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public partial class SubjectController(ISubjectService subjectService) : ControllerBase
{
    private readonly ISubjectService subjectService = subjectService;

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Create([FromBody] CreateSubjectRequestDto request)
    {
        var result = await subjectService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [HttpPost("translation")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateTranslation(
        [FromBody] CreateSubjectTranslationRequestDto request
    )
    {
        var result = await subjectService.CreateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<SubjectResponseDto>>> GetAll(
        [FromQuery] int languageId
    )
    {
        var result = await subjectService.GetAll(languageId);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SubjectResponseDto>> GetSingle(
        int id,
        [FromQuery] int languageId
    )
    {
        var result = await subjectService.GetSingle(id, languageId);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return Ok(result.Value);
    }

    [HttpPut("translation")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> UpdateTranslation(
        [FromBody] UpdateSubjectTranslationRequestDto request
    )
    {
        var result = await subjectService.UpdateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await subjectService.Delete(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{subjectId:int}/translation/{languageId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteTranslation(int subjectId, int languageId)
    {
        var result = await subjectService.DeleteTranslation(subjectId, languageId);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
