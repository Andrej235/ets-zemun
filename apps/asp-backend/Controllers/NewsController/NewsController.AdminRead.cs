using EtsZemun.Dtos.Response.News;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.NewsController;

public partial class NewsController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<IEnumerable<AdminNewsPreviewResponseDto>>> AdminGetAll(
        [FromQuery] int? offset,
        [FromQuery] int? limit
    )
    {
        var result = await newsService.AdminGetAll(offset, limit);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AdminNewsResponseDto>> AdminGetById(int id)
    {
        var result = await newsService.AdminGetById(id);

        if (result.IsFailed)
            return NotFound();

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin/{id:int}/preview")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<NewsPreviewResponseDto>> AdminGetPreview(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await newsService.AdminGetPreviewById(id, languageCode);

        if (result.IsFailed)
            return NotFound();

        return Ok(result.Value);
    }
}
