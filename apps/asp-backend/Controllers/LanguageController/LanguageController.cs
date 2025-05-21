using EtsZemun.Dtos.Request.Language;
using EtsZemun.Dtos.Response.Language;
using EtsZemun.Services.Model.LanguageService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.LanguageController;

[Route("language")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class LanguageController(ILanguageService languageService) : ControllerBase
{
    private readonly ILanguageService languageService = languageService;

    [Authorize(Roles = "Admin")]
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

    [Authorize(Roles = "Admin")]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<LanguageResponseDto>> Update(
        [FromBody] UpdateLanguageRequestDto request
    )
    {
        var result = await languageService.Update(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{code:alpha}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(string code)
    {
        var result = await languageService.Delete(code);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
