using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.News;
using EtsZemun.Errors;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService
{
    public async Task<Result<LazyLoadResponse<NewsPreviewResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    )
    {
        var news = await readService.Get(
            x => x.IsApproved,
            offset,
            limit,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderByDescending(t => t.Date)
        );

        if (news.IsFailed)
            return Result.Fail<LazyLoadResponse<NewsPreviewResponseDto>>(news.Errors);

        var mapped = news.Value.Select(responsePreviewMapper.Map);

        LazyLoadResponse<NewsPreviewResponseDto> result = new()
        {
            Items = mapped,
            LoadedCount = mapped.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                "news-count",
                async (_) => (await countService.Count(x => x.IsApproved)).Value,
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
        };

        result.NextCursor =
            result.LoadedCount < (limit ?? 10)
                ? null
                : $"news?languageCode={languageCode}&offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}";

        return Result.Ok(result);
    }

    public async Task<Result<NewsResponseDto>> GetById(int id, string languageCode)
    {
        var result = await readSingleService.Get(
            x => x.Id == id && x.IsApproved,
            q => q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        if (result.IsFailed)
            return Result.Fail<NewsResponseDto>(result.Errors);

        return responseMapper.Map(result.Value);
    }

    public async Task<Result<NewsPreviewResponseDto>> GetPreviewById(int id, string languageCode)
    {
        var news = await readSingleService.Get(
            x => x.Id == id && x.IsApproved,
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
