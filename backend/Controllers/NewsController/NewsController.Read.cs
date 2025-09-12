using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.News;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.NewsController;

public partial class NewsController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<NewsPreviewResponseDto>>> GetAll(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit
    )
    {
        var result = await newsService.GetAll(languageCode, offset, limit);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<NewsResponseDto>> GetById(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await newsService.GetById(id, languageCode);

        if (result.IsFailed)
            return NotFound();

        return Ok(result.Value);
    }

    [HttpGet("{id:int}/preview")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<NewsPreviewResponseDto>> GetPreview(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await newsService.GetPreviewById(id, languageCode);

        if (result.IsFailed)
            return NotFound();

        return Ok(result.Value);
    }
}
