using EtsZemun.Dtos.Request.Teacher;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.TeacherController;

public partial class TeacherController
{
    [Authorize(Roles = Roles.BasicPerms)]
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

    [Authorize(Roles = Roles.BasicPerms)]
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
}
