using EtsZemun.DTOs.Request.Qualification;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService : IQualificationService
{
    public async Task<Result> UpdateTranslation(UpdateQualificationTranslationRequestDto request)
    {
        var updateResult = await updateQualificationTranslationService.Update(
            x => x.LanguageId == request.LanguageId && x.QualificationId == request.QualificationId,
            x =>
                x.SetProperty(x => x.Name, request.Name)
                    .SetProperty(x => x.Description, request.Description)
        );

        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        return Result.Ok();
    }
}
