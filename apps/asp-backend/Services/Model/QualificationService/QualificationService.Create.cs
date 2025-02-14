using EtsZemun.DTOs.Request.Qualification;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService
{
    public async Task<Result> Create(CreateQualificationRequestDto request)
    {
        var newQualification = await createQualificationService.Add(
            createRequestMapper.Map(request)
        );
        if (newQualification.IsFailed)
            return Result.Fail(newQualification.Errors);

        await hybridCache.RemoveAsync("teacher--1-qualifications-count");
        return Result.Ok();
    }

    public async Task<Result> CreateTranslation(CreateQualificationTranslationRequestDto request)
    {
        var newTranslation = await createQualificationTranslationService.Add(
            createTranslationRequestMapper.Map(request)
        );
        return newTranslation.IsFailed ? Result.Fail(newTranslation.Errors) : Result.Ok();
    }
}
