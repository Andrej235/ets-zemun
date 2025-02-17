using EtsZemun.DTOs.Request.Language;
using EtsZemun.DTOs.Response.Language;
using EtsZemun.Services.Model.LanguageService;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.LanguageController;

[Route("language")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public partial class LanguageController(ILanguageService languageService) : ControllerBase
{
    private readonly ILanguageService languageService = languageService;

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

    [HttpDelete("{code:alpha}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(string code)
    {
        var result = await languageService.Delete(code);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
