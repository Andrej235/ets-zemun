using EtsZemun.Dtos.Response.Exam;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.ExamController;

public partial class ExamController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<ExamResponseDto>>> GetAll(
        [FromQuery] string languageCode
    )
    {
        var result = await examService.GetAll(languageCode);

        if (result.IsFailed)
            return BadRequest();

        return Ok(result.Value);
    }
}
