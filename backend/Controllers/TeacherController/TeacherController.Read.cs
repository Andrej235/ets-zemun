using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Errors;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.TeacherController;

public partial class TeacherController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<TeacherResponseDto>>> GetAll(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit,
        [FromQuery] string? q
    )
    {
        var result = await teacherService.GetAll(languageCode, offset, limit, q);

        if (result.IsFailed)
            return BadRequest("Language not found");

        return Ok(result.Value);
    }

    [HttpGet("simple")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<SimpleTeacherResponseDto>>> GetAllSimple(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit,
        [FromQuery] string? q
    )
    {
        var result = await teacherService.GetAllSimple(languageCode, offset, limit, q);

        if (result.IsFailed)
            return BadRequest("Language not found");

        return Ok(result.Value);
    }

    [HttpGet("open-hours")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<SimpleTeacherResponseDto>>> GetAllOpenHours(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit,
        [FromQuery] string? q
    )
    {
        var result = await teacherService.GetAllOpenHours(languageCode, offset, limit, q);

        if (result.IsFailed)
            return BadRequest("Language not found");

        return Ok(result.Value);
    }

    [HttpGet("simple/for-subject/{subjectId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<SimpleTeacherResponseDto>>> GetAllSimple(
        int subjectId,
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit
    )
    {
        var result = await teacherService.GetAllForSubject(languageCode, subjectId, offset, limit);

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

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<IEnumerable<AdminTeacherResponseDto>>> AdminGetAll()
    {
        var result = await teacherService.AdminGetAll();

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<AdminFullTeacherResponseDto>> AdminGet(int id)
    {
        var result = await teacherService.AdminGet(id);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return Ok(result.Value);
    }
}
