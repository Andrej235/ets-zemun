using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Errors;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.ExamController;

public partial class ExamController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<ExamResponseDto>>> GetAll(
        [FromQuery] string languageCode
    )
    {
        var result = await examService.GetAll(languageCode);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ExamResponseDto>> GetSingle(int id)
    {
        var result = await examService.AdminGetSingle(id);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return Ok(result.Value);
    }
}
