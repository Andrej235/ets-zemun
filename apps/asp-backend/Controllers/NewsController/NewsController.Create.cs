using EtsZemun.Dtos.Request.News;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.NewsController;

public partial class NewsController
{
    [Authorize(Roles = "Mod,Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Create(CreateNewsRequestDto request)
    {
        var result = await newsService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPost("translation")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> CreateTranslation(CreateNewsTranslationRequestDto request)
    {
        var result = await newsService.CreateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }
}
