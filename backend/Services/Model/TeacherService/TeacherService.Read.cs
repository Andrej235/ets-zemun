using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Dtos.Response.Translations;
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

    public async Task<Result<LazyLoadResponse<TeacherOpenHoursResponseDto>>> GetAllOpenHours(
        string languageCode,
        int? offset,
        int? limit,
        string? search
    )
    {
        var teachersResult = await readRangeSelectedService.Get(
            x => new TeacherOpenHoursResponseDto()
            {
                Id = x.Id,
                Name = x.Translations.First(x => x.LanguageCode == languageCode).Name,
                StartOfOpenOfficeHoursFirstShift = x.StartOfOpenOfficeHoursFirstShift,
                StartOfOpenOfficeHoursSecondShift = x.StartOfOpenOfficeHoursSecondShift,
            },
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
            return Result.Fail<LazyLoadResponse<TeacherOpenHoursResponseDto>>(
                teachersResult.Errors
            );

        LazyLoadResponse<TeacherOpenHoursResponseDto> result = new()
        {
            Items = teachersResult.Value,
            LoadedCount = teachersResult.Value.Count(),
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

    public async Task<Result<LazyLoadResponse<SimpleTeacherResponseDto>>> GetAllForSubject(
        string languageCode,
        int subjectId,
        int? offset,
        int? limit
    )
    {
        var teachersResult = await readRangeService.Get(
            x => x.Subjects.Any(s => s.Id == subjectId),
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
                $"subject-{subjectId}-teachers-count",
                async (_) =>
                {
                    var result = await countService.Count(x =>
                        x.Subjects.Any(s => s.Id == subjectId)
                    );
                    return result.Value;
                },
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
        };
        result.NextCursor =
            result.LoadedCount < (limit ?? 10)
                ? null
                : $"teacher/simple/for-subject/{subjectId}?languageCode={languageCode}&offset={(offset ?? 0) + (limit ?? 10)}&limit={limit ?? 10}";

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

    public Task<Result<IEnumerable<AdminTeacherResponseDto>>> AdminGetAll()
    {
        return readRangeSelectedService.Get(
            x => new AdminTeacherResponseDto()
            {
                Id = x.Id,
                Name = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Name,
                Title = x
                    .Translations.OrderByDescending(x => x.LanguageCode == "sr_lt" ? 1 : 0)
                    .First()
                    .Title,
                Translations = x.Translations.Select(x => x.LanguageCode),
                Email = x.Email,
                Image = x.Image,
            },
            null
        );
    }

    public Task<Result<AdminFullTeacherResponseDto>> AdminGet(int id)
    {
        return readSingleSelectedService.Get(
            x => new AdminFullTeacherResponseDto()
            {
                Id = x.Id,
                Email = x.Email,
                Image = x.Image,
                StartOfOpenOfficeHoursFirstShift = x.StartOfOpenOfficeHoursFirstShift,
                StartOfOpenOfficeHoursSecondShift = x.StartOfOpenOfficeHoursSecondShift,
                Qualifications = x.Qualifications.Select(
                    q => new Dtos.Response.Qualification.AdminQualificationResponseDto()
                    {
                        Id = q.Id,
                        TeacherId = q.TeacherId,
                        DateObtained = q.DateObtained,
                        Translations = q.Translations.Select(
                            x => new TranslationWrapper<Dtos.Response.Qualification.AdminQualificationTranslationResponseDto>()
                            {
                                LanguageCode = x.LanguageCode,
                                Value =
                                    new Dtos.Response.Qualification.AdminQualificationTranslationResponseDto()
                                    {
                                        Name = x.Name,
                                        Description = x.Description,
                                    },
                            }
                        ),
                    }
                ),
                Subjects = x.Subjects.Select(
                    s => new Dtos.Response.Subject.SimpleSubjectResponseDto()
                    {
                        Id = s.Id,
                        Name = s
                            .Translations.OrderByDescending(s => s.LanguageCode == "sr_lt" ? 1 : 0)
                            .First()
                            .Name,
                        Description = s
                            .Translations.OrderByDescending(s => s.LanguageCode == "sr_lt" ? 1 : 0)
                            .First()
                            .Description,
                    }
                ),
                Translations = x.Translations.Select(
                    t => new TranslationWrapper<AdminFullTeacherTranslationResponseDto>()
                    {
                        LanguageCode = t.LanguageCode,
                        Value = new AdminFullTeacherTranslationResponseDto()
                        {
                            Name = t.Name,
                            Title = t.Title,
                            Bio = t.Bio,
                        },
                    }
                ),
            },
            x => x.Id == id
        );
    }
}
