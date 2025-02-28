using EtsZemun.DTOs;
using EtsZemun.DTOs.Response.Award;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.AwardService;

public partial class AwardService
{
    public async Task<Result<LazyLoadResponse<AwardResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    )
    {
        var awards = await readRangeService.Get(
            null,
            offset,
            limit ?? 10,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderByDescending(x => x.Id)
        );

        if (awards.IsFailed)
            return Result.Fail<LazyLoadResponse<AwardResponseDto>>(awards.Errors);

        var mapped = awards.Value.Select(responseMapper.Map);

        LazyLoadResponse<AwardResponseDto> result = new()
        {
            Items = mapped,
            LoadedCount = mapped.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                "awards-count",
                async (_) => (await countService.Count(null)).Value,
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
        };

        result.NextCursor =
            result.LoadedCount < (limit ?? 10)
                ? null
                : $"award?languageCode={languageCode}&offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}";

        return Result.Ok(result);
    }

    public async Task<Result<AwardResponseDto>> GetSingle(int id, string languageCode)
    {
        var result = await readSingleService.Get(
            x => x.Id == id,
            q => q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        if (result.IsFailed)
            return Result.Fail<AwardResponseDto>(result.Errors);

        return Result.Ok(responseMapper.Map(result.Value));
    }
}
