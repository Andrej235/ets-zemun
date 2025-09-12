using EtsZemun.Dtos.Response.Captions;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.CaptionController;

public partial class CaptionController
{
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CaptionResponseDto>> GetById(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await captionService.GetSingle(id, languageCode);

        if (result.IsFailed)
            return NotFound();

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<AdminCaptionResponseDto>>> AdminGetAll()
    {
        var result = await captionService.AdminGetAll();

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpGet("admin/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AdminCaptionResponseDto>> AdminGetSingle(int id)
    {
        var result = await captionService.AdminGetSingle(id);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }
}
