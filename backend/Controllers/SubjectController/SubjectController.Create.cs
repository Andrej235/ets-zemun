using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.SubjectController;

public partial class SubjectController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Create([FromBody] CreateSubjectRequestDto request)
    {
        var result = await subjectService.Create(request);

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
        [FromBody] CreateSubjectTranslationRequestDto request
    )
    {
        var result = await subjectService.CreateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }
}
