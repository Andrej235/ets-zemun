using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.Award;
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

    public Task<Result<IEnumerable<AdminAwardResponseDto>>> AdminGetAll()
    {
        return readRangeSelectedService.Get(
            x => new AdminAwardResponseDto()
            {
                Id = x.Id,
                DayOfAward = x.DayOfAward,
                ExternalLink = x.ExternalLink,
                Image = x.Image,
                Translations = x.Translations.Select(x => x.LanguageCode),
                Competition = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Competition,
                Description = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Description,
                Student = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Student,
                Title = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Title,
            },
            null
        );
    }

    public Task<Result<AdminFullAwardResponseDto>> AdminGetSingle(int id)
    {
        return readSingleSelectedService.Get(
            x => new AdminFullAwardResponseDto()
            {
                Id = x.Id,
                DayOfAward = x.DayOfAward,
                ExternalLink = x.ExternalLink,
                Image = x.Image,
                Translations = x.Translations.Select(
                    x => new Dtos.Response.Translations.TranslationWrapper<AdminAwardTranslationResponseDto>()
                    {
                        LanguageCode = x.LanguageCode,
                        Value = new AdminAwardTranslationResponseDto()
                        {
                            Competition = x.Competition,
                            Description = x.Description,
                            Student = x.Student,
                            Title = x.Title,
                        },
                    }
                ),
            },
            x => x.Id == id
        );
    }
}
