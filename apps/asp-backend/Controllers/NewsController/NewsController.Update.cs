using EtsZemun.Dtos.Request.News;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.NewsController;

public partial class NewsController
{
    [Authorize(Roles = "Mod,Admin")]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Update([FromBody] UpdateNewsRequestDto request)
    {
        var result = await newsService.Update(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPut("translation")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> UpdateTranslation(
        [FromBody] UpdateNewsTranslationRequestDto request
    )
    {
        var result = await newsService.UpdateTranslation(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPut("approve/{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Approve(int id)
    {
        var result = await newsService.Approve(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpPut("disapprove/{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Disapprove(int id)
    {
        var result = await newsService.Disapprove(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
