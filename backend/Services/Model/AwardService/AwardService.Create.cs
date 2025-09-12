using EtsZemun.Dtos.Request.Award;
using FluentResults;

namespace EtsZemun.Services.Model.AwardService;

public partial class AwardService
{
    public async Task<Result> Create(CreateAwardRequestDto request)
    {
        var newAward = await createSingleService.Add(createRequestMapper.Map(request));
        if (newAward.IsFailed)
            return Result.Fail(newAward.Errors);

        await hybridCache.RemoveAsync("awards-count");
        return Result.Ok();
    }

    public async Task<Result> CreateTranslation(CreateAwardTranslationRequestDto request)
    {
        var newTranslation = await createSingleTranslationService.Add(
            createTranslationRequestMapper.Map(request)
        );
        return newTranslation.IsFailed ? Result.Fail(newTranslation.Errors) : Result.Ok();
    }
}
