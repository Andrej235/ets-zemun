using EtsZemun.Dtos.Request.Caption;
using EtsZemun.Errors;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.CaptionService;

public partial class CaptionService
{
    public async Task<Result> Update(UpdateCaptionRequestDto request)
    {
        if (request.Id < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        var updateTranslationResult = await updateTranslationService.Update(
            request.Translations.Select(x => new CaptionTranslation()
            {
                Title = x.Title,
                LanguageCode = x.LanguageCode,
                CaptionId = request.Id,
            })
        );

        if (updateTranslationResult.IsFailed)
            return Result.Fail(updateTranslationResult.Errors);

        return await updateService.Update(
            x => x.Id == request.Id,
            x => x.SetProperty(x => x.AdminDescription, request.AdminDescription)
        );
    }
}
