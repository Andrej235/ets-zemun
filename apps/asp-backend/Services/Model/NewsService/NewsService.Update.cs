using EtsZemun.DTOs.Request.News;
using EtsZemun.Errors;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService
{
    public async Task<Result> Update(UpdateNewsRequestDto request)
    {
        if (request.Id < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        var updateResult = await updateService.Update(
            x => x.Id == request.Id,
            x =>
                x.SetProperty(x => x.Date, request.Date)
                    .SetProperty(x => x.PreviewImage, request.PreviewImage)
        );

        if (updateResult.IsFailed)
            return updateResult;

        var deleteImagesResult = await deleteImageService.Delete(
            x => x.NewsId == request.Id,
            false
        );
        if (deleteImagesResult.IsFailed)
            return deleteImagesResult;

        var createImagesResult = await createRangeImageService.Add(
            request.Images.Select(x => new NewsImage
            {
                NewsId = request.Id,
                ImageId = x.Id,
                Image = x.Image,
            })
        );
        if (createImagesResult.IsFailed)
            return createImagesResult;

        return Result.Ok();
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

    public Task<Result> Approve(int id)
    {
        return updateService.Update(x => x.Id == id, x => x.SetProperty(x => x.IsApproved, true));
    }

    public Task<Result> Disapprove(int id)
    {
        return updateService.Update(x => x.Id == id, x => x.SetProperty(x => x.IsApproved, false));
    }
}
