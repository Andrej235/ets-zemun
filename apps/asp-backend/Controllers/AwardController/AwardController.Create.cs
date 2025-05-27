using EtsZemun.Dtos.Request.Award;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.AwardController;

public partial class AwardController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Create([FromBody] CreateAwardRequestDto request)
    {
        var result = await awardService.Create(request);

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
        [FromBody] CreateAwardTranslationRequestDto request
    )
    {
        var result = await awardService.CreateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return Created();
    }
}
