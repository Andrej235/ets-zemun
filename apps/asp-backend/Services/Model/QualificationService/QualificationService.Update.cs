using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService : IQualificationService
{
    public async Task<Result> UpdateTranslation(UpdateQualificationTranslationRequestDto request)
    {
        if (request.QualificationId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode))
            return Result.Fail(new BadRequest("Invalid request"));

        var updateResult = await updateQualificationTranslationService.Update(
            x =>
                x.LanguageCode == request.LanguageCode
                && x.QualificationId == request.QualificationId,
            x =>
                x.SetProperty(x => x.Name, request.Name)
                    .SetProperty(x => x.Description, request.Description)
        );

        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        return Result.Ok();
    }
}
