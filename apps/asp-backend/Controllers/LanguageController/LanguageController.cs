using EtsZemun.DTOs.Request.Language;
using EtsZemun.DTOs.Response.Language;
using EtsZemun.Services.Model.LanguageService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.LanguageController;

[Route("language")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public partial class LanguageController(ILanguageService languageService) : ControllerBase
{
    private readonly ILanguageService languageService = languageService;

    [Authorize(Roles = "Mod,Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<LanguageResponseDto>> Create(
        [FromBody] CreateLanguageRequestDto request
    )
    {
        var result = await languageService.Create(request);

        if (result.IsFailed)
            return BadRequest();

        return Created((string?)null, result.Value);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LanguageResponseDto>>> GetAll()
    {
        var result = await languageService.GetAll();

        if (result.IsFailed)
            return StatusCode(StatusCodes.Status500InternalServerError);

        return Ok(result.Value);
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await languageService.Delete(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
