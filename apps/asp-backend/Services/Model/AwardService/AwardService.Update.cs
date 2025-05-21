using EtsZemun.Dtos.Request.Award;
using EtsZemun.Errors;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.AwardService;

public partial class AwardService
{
    public async Task<Result> Update(UpdateAwardRequestDto request)
    {
        if (request.Id < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        var updateResult = await updateTranslationRangeService.Update(
            request.Translations.Select(x => new AwardTranslation()
            {
                AwardId = request.Id,
                Competition = x.Competition,
                Student = x.Student,
                Title = x.Title,
                Description = x.Description,
                LanguageCode = x.LanguageCode,
            })
        );

        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        return await updateSingleService.Update(updateRequestMapper.Map(request));
    }

    public Task<Result> UpdateTranslation(UpdateAwardTranslationRequestDto request) =>
        request.AwardId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode)
            ? Task.FromResult(Result.Fail(new BadRequest("Invalid request")))
            : updateTranslationSingleService.Update(updateTranslationRequestMapper.Map(request));
}
