using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.ExamController;

public partial class ExamController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Update([FromBody] UpdateExamRequestDto request)
    {
        var result = await examService.Update(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }
}
