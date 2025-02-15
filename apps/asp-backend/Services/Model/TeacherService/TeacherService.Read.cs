using EtsZemun.DTOs;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService : ITeacherService
{
    public async Task<Result<LazyLoadResponse<TeacherResponseDto>>> GetAll(
        int languageId,
        int? offset,
        int? limit,
        int? subjectId
    )
    {
        var teachersResult = await readRangeService.Get(
            subjectId is null ? null : x => x.Subjects.Any(s => s.Id == subjectId),
            offset,
            limit ?? 10,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .OrderBy(x => x.Id)
        );

        if (teachersResult.IsFailed)
            return Result.Fail<LazyLoadResponse<TeacherResponseDto>>(teachersResult.Errors);

        var mapped = teachersResult.Value.Select(responseMapper.Map);

        LazyLoadResponse<TeacherResponseDto> result = new()
        {
            Items = mapped,
            LoadedCount = mapped.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                $"subject-{subjectId ?? -1}-teachers-count",
                async (_) =>
                {
                    var result = await countService.Count(
                        subjectId is null ? null : x => x.Subjects.Any(s => s.Id == subjectId)
                    );
                    return result.Value;
                },
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
        };
        result.NextCursor =
            result.LoadedCount < (limit ?? 10)
                ? null
                : $"teacher?languageId={languageId}&offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}{(subjectId is null ? "" : "&subjectId=" + subjectId)}";

        return Result.Ok(result);
    }

    public async Task<Result<TeacherResponseDto>> GetSingle(int id, int languageId)
    {
        var result = await readSingleService.Get(
            x => x.Id == id,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
        );

        if (result.IsFailed)
            return Result.Fail<TeacherResponseDto>(result.Errors);

        return Result.Ok(responseMapper.Map(result.Value));
    }
}
