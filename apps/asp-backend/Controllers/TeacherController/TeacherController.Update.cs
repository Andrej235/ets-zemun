using EtsZemun.Dtos.Request.Teacher;
using EtsZemun.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.TeacherController;

public partial class TeacherController
{
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
}
