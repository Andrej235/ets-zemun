using EtsZemun.Dtos.Request.Qualification;
using EtsZemun.Errors;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService : IQualificationService
{
    public async Task<Result> Update(UpdateQualificationRequestDto request)
    {
        if (request.Id < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        request.DateObtained = DateTime.SpecifyKind(request.DateObtained, DateTimeKind.Utc);
        var updateResult = await updateQualificationService.Update(
            x => x.Id == request.Id,
            x => x.SetProperty(x => x.DateObtained, request.DateObtained)
        );

        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        var translationUpdateResult = await updateRangeTranslationService.Update(
            request.Translations.Select(x => new QualificationTranslation()
            {
                Name = x.Name,
                Description = x.Description,
                LanguageCode = x.LanguageCode,
                QualificationId = request.Id,
            })
        );

        if (translationUpdateResult.IsFailed)
            return Result.Fail(translationUpdateResult.Errors);

        return Result.Ok();
    }

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
        {
            var result = await CreateTranslation(
                new()
                {
                    LanguageCode = request.LanguageCode,
                    QualificationId = request.QualificationId,
                    Name = request.Name,
                    Description = request.Description,
                }
            );

            if (result.IsFailed)
                return result;
        }
        return Result.Ok();
    }
}
