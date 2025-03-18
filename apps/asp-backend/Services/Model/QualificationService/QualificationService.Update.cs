using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.Errors;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService : IQualificationService
{
    public async Task<Result> UpdateTranslation(UpdateQualificationTranslationRequestDto request)
    {
        if (request.QualificationId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode))
            return Result.Fail(new BadRequest("Invalid request"));

        var updateResult = await updateSingleQualificationTranslationService.Update(
            new QualificationTranslation
            {
                QualificationId = request.QualificationId,
                LanguageCode = request.LanguageCode,
                Name = request.Name,
                Description = request.Description,
            }
        );

        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        return Result.Ok();
    }
}
