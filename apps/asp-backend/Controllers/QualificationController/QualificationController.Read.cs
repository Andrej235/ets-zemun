using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.Qualification;
using EtsZemun.Errors;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.QualificationController;

public partial class QualificationController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LazyLoadResponse<QualificationResponseDto>>> GetAll(
        [FromQuery] string languageCode,
        [FromQuery] int? offset,
        [FromQuery] int? limit,
        [FromQuery] int? teacherId
    )
    {
        var result = await qualificationService.GetAll(languageCode, offset, limit, teacherId);

        if (result.IsFailed)
            return BadRequest("Language not found");

        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<QualificationResponseDto>> GetSingle(
        int id,
        [FromQuery] string languageCode
    )
    {
        var result = await qualificationService.GetSingle(id, languageCode);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound("Qualification not found");

            return BadRequest("Language not found");
        }

        return Ok(result.Value);
    }
}
