using EtsZemun.Dtos.Response.News;
using EtsZemun.Dtos.Response.Translations;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService
{
    public Task<Result<IEnumerable<AdminNewsPreviewResponseDto>>> AdminGetAll(
        int? offset,
        int? limit
    )
    {
        return readSelectedService.Get(
            x => new AdminNewsPreviewResponseDto()
            {
                Id = x.Id,
                Date = x.Date,
                Title = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Title,
                Description = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Description,
                IsApproved = x.IsApproved,
                PreviewImage = x.PreviewImage,
                Translations = x.Translations.Select(t => t.LanguageCode),
            },
            null,
            offset,
            limit,
            q => q.OrderByDescending(x => x.Date)
        );
    }

    public Task<Result<AdminNewsResponseDto>> AdminGetById(int id)
    {
        return readSingleSelectedService.Get(
            x => new AdminNewsResponseDto()
            {
                Id = x.Id,
                IsApproved = x.IsApproved,
                Date = x.Date,
                PreviewImage = x.PreviewImage,
                Translations = x.Translations.Select(
                    t => new TranslationWrapper<AdminNewsTranslationResponseDto>()
                    {
                        LanguageCode = t.LanguageCode,
                        Value = new AdminNewsTranslationResponseDto()
                        {
                            Title = t.Title,
                            Description = t.Description,
                            Markup = t.Markup,
                        },
                    }
                ),
            },
            x => x.Id == id
        );
    }

    public async Task<Result<NewsPreviewResponseDto>> AdminGetPreviewById(
        int id,
        string languageCode
    )
    {
        var news = await readSingleService.Get(
            x => x.Id == id,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderByDescending(t => t.Date)
        );

        if (news.IsFailed)
            return Result.Fail<NewsPreviewResponseDto>(news.Errors);

        var mapped = responsePreviewMapper.Map(news.Value);
        return Result.Ok(mapped);
    }
}
