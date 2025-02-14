using EtsZemun.DTOs.Request.Award;
using FluentResults;

namespace EtsZemun.Services.Model.AwardService;

public partial class AwardService
{
    public Task<Result> Update(UpdateAwardRequestDto request) =>
        updateSingleService.Update(updateRequestMapper.Map(request));

    public Task<Result> UpdateTranslation(UpdateAwardTranslationRequestDto request) =>
        updateTranslationSingleService.Update(updateTranslationRequestMapper.Map(request));
}
