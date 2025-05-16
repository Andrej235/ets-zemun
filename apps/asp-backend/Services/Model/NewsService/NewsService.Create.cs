using EtsZemun.Dtos.Request.News;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService
{
    public async Task<Result> Create(CreateNewsRequestDto request)
    {
        var newNews = await createService.Add(createRequestMapper.Map(request));
        if (newNews.IsFailed)
            return Result.Fail(newNews.Errors);

        var newImages = await createRangeImageService.Add(
            request.Images.Select(x => new NewsImage()
            {
                NewsId = newNews.Value.Id,
                Image = x.Image,
                ImageId = x.Id,
            })
        );
        if (newImages.IsFailed)
            return Result.Fail(newImages.Errors);

        await hybridCache.RemoveAsync("news-count");
        return Result.Ok();
    }

    public async Task<Result> CreateTranslation(CreateNewsTranslationRequestDto request)
    {
        var newTranslation = await createTranslationService.Add(
            createTranslationRequestMapper.Map(request)
        );
        return newTranslation.IsFailed ? Result.Fail(newTranslation.Errors) : Result.Ok();
    }
}
