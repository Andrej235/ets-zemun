using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.NewsController;

public partial class NewsController
{
    [Authorize(Roles = "Mod,Admin")]
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await newsService.Delete(id);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }

    [Authorize(Roles = "Mod,Admin")]
    [HttpDelete("{newsId:int}/translation/{languageCode}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteTranslation(int newsId, string languageCode)
    {
        var result = await newsService.DeleteTranslation(newsId, languageCode);

        if (result.IsFailed)
            return NotFound();

        return NoContent();
    }
}
