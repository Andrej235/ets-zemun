using EtsZemun.Dtos.Request.Caption;
using FluentResults;

namespace EtsZemun.Services.Model.CaptionService;

public partial class CaptionService
{
    public async Task<Result> Create(CreateCaptionRequestDto request)
    {
        var mapped = createRequestMapper.Map(request);
        var result = await createService.Add(mapped);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        return Result.Ok();
    }

    public async Task<Result> CreateTranslation(CaptionTranslationRequestDto request)
    {
        var result = await createTranslationService.Add(
            new Models.CaptionTranslation()
            {
                CaptionId = request.CaptionId,
                LanguageCode = request.LanguageCode,
                Title = request.Title,
            }
        );

        return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
    }
}
