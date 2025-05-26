using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.News;
using EtsZemun.Errors;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService
{
    public async Task<Result<IEnumerable<AdminNewsPreviewResponseDto>>> AdminGetAll(
        int? offset,
        int? limit
    )
    {
        return await readSelectedService.Get(
            x => new AdminNewsPreviewResponseDto()
            {
                Id = x.Id,
                Date = x.Date,
                Title = x.Translations.First().Title,
                Description = x.Translations.First().Description,
                IsApproved = x.IsApproved,
                PreviewImage = x.PreviewImage,
                Translations = x.Translations.Select(t => t.LanguageCode),
            },
            null,
            offset,
            limit
        );
    }

    public async Task<Result<NewsResponseDto>> AdminGetById(int id, string languageCode)
    {
        var result = await readSingleService.Get(
            x => x.Id == id,
            q => q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        if (result.IsFailed)
            return Result.Fail<NewsResponseDto>(result.Errors);

        var mapped = responseMapper.Map(result.Value);
        mapped.Images = new()
        {
            LoadedCount = 0,
            TotalCount = await hybridCache.GetOrCreateAsync(
                $"news-{id}-images-count",
                async (_) => (await imageCountService.Count(x => x.NewsId == id)).Value,
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
            Items = [],
            NextCursor = $"news/{id}/images?offset=0&limit=1",
        };

        return Result.Ok(mapped);
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

    public async Task<Result<LazyLoadResponse<NewsImageResponseDto>>> AdminGetImages(
        int id,
        int? offset,
        int? limit
    )
    {
        if (id < 1)
            return Result.Fail<LazyLoadResponse<NewsImageResponseDto>>(
                new BadRequest("Invalid request")
            );

        var result = await readImageService.Get(
            x => x.NewsId == id,
            offset,
            limit ?? 1,
            x => x.OrderBy(x => x.ImageId)
        );

        if (result.IsFailed)
            return Result.Fail<LazyLoadResponse<NewsImageResponseDto>>(result.Errors);

        var mapped = result.Value.Select(x => new NewsImageResponseDto()
        {
            Id = x.ImageId,
            Image = x.Image,
        });

        var total = await hybridCache.GetOrCreateAsync(
            $"news-{id}-images-count",
            async (_) => (await imageCountService.Count(x => x.NewsId == id)).Value,
            new() { Expiration = TimeSpan.FromHours(6) }
        );

        return Result.Ok(
            new LazyLoadResponse<NewsImageResponseDto>()
            {
                Items = mapped,
                LoadedCount = mapped.Count(),
                TotalCount = total,
                NextCursor =
                    total <= ((limit ?? 0) + (offset ?? 1))
                        ? null
                        : $"news/{id}/images?offset={(offset ?? 0) + (limit ?? 1)}&limit={limit ?? 1}",
            }
        );
    }
}
