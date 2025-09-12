using EtsZemun.Dtos.Request.Caption;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.CaptionController;

public partial class CaptionController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Update([FromBody] UpdateCaptionRequestDto request)
    {
        var result = await captionService.Update(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }
}
