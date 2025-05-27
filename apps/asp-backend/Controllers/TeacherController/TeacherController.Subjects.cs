using EtsZemun.Dtos.Request.Teacher;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.TeacherController;

public partial class TeacherController
{
    [Authorize(Roles = Roles.BasicPerms)]
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

    [Authorize(Roles = Roles.BasicPerms)]
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

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPut("subject")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> ReplaceSubjects(
        [FromBody] ReplaceTeacherSubjectsRequestDto request
    )
    {
        var result = await teacherService.ReplaceSubjects(request);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
