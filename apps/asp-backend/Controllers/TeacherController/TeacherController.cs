using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Errors;
using EtsZemun.Services.Model.TeacherService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.TeacherController;

[Route("teacher")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public class TeacherController(ITeacherService teacherService) : ControllerBase
{
    private readonly ITeacherService teacherService = teacherService;

    [Authorize(Roles = "Mod,Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Create([FromBody] CreateTeacherRequestDto request)
    {
        var result = await teacherService.Create(request);

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
        [FromBody] CreateTeacherTranslationRequestDto request
    )
    {
        var result = await teacherService.CreateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<TeacherResponseDto>>> GetAll(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit,
        [FromQuery] int? subjectId
    )
    {
        var result = await teacherService.GetAll(languageCode, offset, limit, subjectId);

        if (result.IsFailed)
            return BadRequest("Language not found");

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TeacherResponseDto>> GetSingle(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await teacherService.GetSingle(id, languageCode);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound("Teacher not found");

            return BadRequest("Language not found");
        }

        return Ok(result.Value);
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Update([FromBody] UpdateTeacherRequestDto request)
    {
        var result = await teacherService.Update(request);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPut("translation")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> UpdateTranslation(
        [FromBody] UpdateTeacherTranslationRequestDto request
    )
    {
        var result = await teacherService.UpdateTranslation(request);

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
        var result = await teacherService.Delete(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpDelete("{teacherId:int}/translation/{languageCode:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteTranslation(int teacherId, string languageCode)
    {
        var result = await teacherService.DeleteTranslation(teacherId, languageCode);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPost("subject")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> AddSubject([FromBody] AddSubjectsToTeacherRequestDto request)
    {
        var result = await teacherService.AddSubject(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpDelete("{teacherId:int}/subject/{subjectId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveSubject(int teacherId, int subjectId)
    {
        var result = await teacherService.RemoveSubject(teacherId, subjectId);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
