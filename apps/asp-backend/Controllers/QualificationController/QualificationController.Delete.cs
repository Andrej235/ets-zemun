using EtsZemun.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.QualificationController;

public partial class QualificationController
{
    [Authorize(Roles = Roles.BasicPerms)]
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await qualificationService.Delete(id);

        if (result.IsFailed)
            return NotFound("Qualification not found");

        return NoContent();
    }

    [Authorize(Roles = Roles.BasicPerms)]
    [HttpDelete("{qualificationId:int}/translation/{languageCode}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteTranslation(int qualificationId, string languageCode)
    {
        var result = await qualificationService.DeleteTranslation(qualificationId, languageCode);

        if (result.IsFailed)
            return NotFound("Qualification translation not found");

        return NoContent();
    }
}
