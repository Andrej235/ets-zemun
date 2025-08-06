using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.ExamController;

public partial class ExamController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<CreateExamResponseDto>> Create(
        [FromBody] CreateExamRequestDto request
    )
    {
        var result = await examService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created((string?)null, result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPost("bulk")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> CreateBulk([FromBody] IEnumerable<CreateExamRequestDto> request)
    {
        var result = await examService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }
}
