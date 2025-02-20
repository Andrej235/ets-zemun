using EtsZemun.DTOs.Request.News;
using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService
{
    public Task<Result> Update(UpdateNewsRequestDto request)
    {
        return request.Id < 1
            ? Task.FromResult(Result.Fail(new BadRequest("Invalid request")))
            : updateService.Update(
                x => x.Id == request.Id,
                x =>
                    x.SetProperty(x => x.Date, request.Date)
                        .SetProperty(x => x.PreviewImage, request.PreviewImage)
            );
    }

    public Task<Result> UpdateTranslation(UpdateNewsTranslationRequestDto request)
    {
        return request.Id < 1 || string.IsNullOrWhiteSpace(request.LanguageCode)
            ? Task.FromResult(Result.Fail(new BadRequest("Invalid request")))
            : updateTranslationService.Update(
                x => x.NewsId == request.Id && x.LanguageCode == request.LanguageCode,
                x =>
                    x.SetProperty(x => x.Title, request.Title)
                        .SetProperty(x => x.Description, request.Description)
                        .SetProperty(x => x.Markup, request.Markup)
            );
    }
}
