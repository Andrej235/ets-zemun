using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.Qualification;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService : IQualificationService
{
    public async Task<Result<LazyLoadResponse<QualificationResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit,
        int? teacherId
    )
    {
        var qualificationsResult = await readRangeService.Get(
            teacherId is null ? null : x => x.TeacherId == teacherId,
            offset,
            limit ?? 10,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderBy(x => x.Id)
        );

        if (qualificationsResult.IsFailed)
            return Result.Fail<LazyLoadResponse<QualificationResponseDto>>(
                qualificationsResult.Errors
            );

        var mapped = qualificationsResult.Value.Select(responseMapper.Map);

        LazyLoadResponse<QualificationResponseDto> result = new()
        {
            Items = mapped,
            LoadedCount = mapped.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                $"teacher-{teacherId ?? -1}-qualifications-count",
                async (_) =>
                {
                    var result = await countQualificationService.Count(
                        teacherId is null ? null : x => x.TeacherId == teacherId
                    );
                    return result.Value;
                },
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
        };

        result.NextCursor =
            result.LoadedCount < (limit ?? 10)
                ? null
                : $"qualification?languageCode={languageCode}&offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}";

        return Result.Ok(result);
    }

    public async Task<Result<QualificationResponseDto>> GetSingle(int id, string languageCode)
    {
        var result = await readQualificationService.Get(
            x => x.Id == id,
            q => q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        if (result.IsFailed)
            return Result.Fail<QualificationResponseDto>(result.Errors);

        return Result.Ok(responseMapper.Map(result.Value));
    }
}
