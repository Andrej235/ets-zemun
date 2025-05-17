using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Errors;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.SubjectController;

public partial class SubjectController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<SimpleSubjectResponseDto>>> GetAll(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit
    )
    {
        var result = await subjectService.GetAll(languageCode, offset, limit);

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
        [FromQuery] string languageCode
    )
    {
        var result = await subjectService.GetSingle(id, languageCode);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<AdminSubjectResponseDto>>> AdminGetAll(
        [FromQuery] int? offset
    )
    {
        var result = await subjectService.AdminGetAll(offset);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AdminFullSubjectResponseDto>> AdminGetSingle(int id)
    {
        var result = await subjectService.AdminGetSingle(id);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return Ok(result.Value);
    }
}
