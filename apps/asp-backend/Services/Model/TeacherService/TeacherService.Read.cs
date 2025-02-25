using EtsZemun.DTOs;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Services.Read;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService : ITeacherService
{
    public async Task<Result<LazyLoadResponse<TeacherResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit,
        string? search
    )
    {
        var teachersResult = await readRangeService.Get(
            search is null
                ? null
                : x => x.Translations.Any(t => EF.Functions.Like(t.Name, $"%{search}%")),
            offset,
            limit ?? 10,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderByDescending(x => x.Id)
        );

        if (teachersResult.IsFailed)
            return Result.Fail<LazyLoadResponse<TeacherResponseDto>>(teachersResult.Errors);

        var mapped = teachersResult.Value.Select(responseMapper.Map);

        LazyLoadResponse<TeacherResponseDto> result = new()
        {
            Items = mapped,
            LoadedCount = mapped.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                $"teachers-count-q-{search ?? ""}",
                async (_) =>
                {
                    var result = await countService.Count(
                        search is null
                            ? null
                            : x => x.Translations.Any(t => EF.Functions.Like(t.Name, $"%{search}%"))
                    );
                    return result.Value;
                },
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
        };
        result.NextCursor =
            result.LoadedCount < (limit ?? 10)
                ? null
                : $"teacher?languageCode={languageCode}&offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}{(search is null ? "" : "&q=" + search)}";

        return Result.Ok(result);
    }

    public async Task<Result<LazyLoadResponse<SimpleTeacherResponseDto>>> GetAllSimple(
        string languageCode,
        int? offset,
        int? limit,
        string? search
    )
    {
        var teachersResult = await readRangeService.Get(
            search is null
                ? null
                : x => x.Translations.Any(t => EF.Functions.Like(t.Name, $"%{search}%")),
            offset,
            limit ?? 10,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderByDescending(x => x.Id)
        );

        if (teachersResult.IsFailed)
            return Result.Fail<LazyLoadResponse<SimpleTeacherResponseDto>>(teachersResult.Errors);

        var mapped = teachersResult.Value.Select(simpleResponseMapper.Map);

        LazyLoadResponse<SimpleTeacherResponseDto> result = new()
        {
            Items = mapped,
            LoadedCount = mapped.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                $"teachers-count-q-{search ?? ""}",
                async (_) =>
                {
                    var result = await countService.Count(
                        search is null
                            ? null
                            : x => x.Translations.Any(t => EF.Functions.Like(t.Name, $"%{search}%"))
                    );
                    return result.Value;
                },
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
        };
        result.NextCursor =
            result.LoadedCount < (limit ?? 10)
                ? null
                : $"teacher/simple?languageCode={languageCode}&offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}{(search is null ? "" : "&q=" + search)}";

        return Result.Ok(result);
    }

    public async Task<Result<TeacherResponseDto>> GetSingle(int id, string languageCode)
    {
        var result = await readSingleService.Get(
            x => x.Id == id,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        if (result.IsFailed)
            return Result.Fail<TeacherResponseDto>(result.Errors);

        return Result.Ok(responseMapper.Map(result.Value));
    }
}
