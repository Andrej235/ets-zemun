using EtsZemun.DTOs.Request.Award;
using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.Model.AwardService;

public partial class AwardService
{
    public Task<Result> Update(UpdateAwardRequestDto request) =>
        request.Id < 1
            ? Task.FromResult(Result.Fail(new BadRequest("Invalid request")))
            : updateSingleService.Update(updateRequestMapper.Map(request));

    public Task<Result> UpdateTranslation(UpdateAwardTranslationRequestDto request) =>
        request.AwardId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode)
            ? Task.FromResult(Result.Fail(new BadRequest("Invalid request")))
            : updateTranslationSingleService.Update(updateTranslationRequestMapper.Map(request));
}
