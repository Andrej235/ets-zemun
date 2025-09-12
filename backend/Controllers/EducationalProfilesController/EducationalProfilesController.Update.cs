using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Errors;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.EducationalProfilesController;

public partial class EducationalProfilesController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Update([FromBody] UpdateEducationalProfileRequestDto request)
    {
        var result = await profileService.Update(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPatch("add-subject")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> AddSubject([FromBody] AddSubjectRequestDto request)
    {
        var result = await profileService.AddSubject(request);

        if (result.IsFailed)
            return BadRequest();

        return NoContent();
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPatch("remove-subject")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveSubject([FromBody] RemoveSubjectRequestDto request)
    {
        var result = await profileService.RemoveSubject(request);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return NoContent();
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPatch("update-subject")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateSubject([FromBody] UpdateProfileSubjectRequestDto request)
    {
        var result = await profileService.UpdateSubject(request);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return NoContent();
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpPatch("update-name")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateName(
        [FromBody] UpdateEducationalProfileNameRequestDto request
    )
    {
        var result = await profileService.UpdateName(request);

        if (result.IsFailed)
        {
            if (result.HasError<NotFound>())
                return NotFound();

            return BadRequest();
        }

        return NoContent();
    }
}
