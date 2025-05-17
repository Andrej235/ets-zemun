using EtsZemun.Dtos;
using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Errors;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.SubjectService;

public partial class SubjectService
{
    public async Task<Result<LazyLoadResponse<SimpleSubjectResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    )
    {
        if (string.IsNullOrWhiteSpace(languageCode))
            return Result.Fail<LazyLoadResponse<SimpleSubjectResponseDto>>(
                new BadRequest("Invalid request")
            );

        var result = await readRangeService.Get(
            null,
            offset,
            limit,
            q =>
                q.Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderByDescending(t => t.Id)
        );

        if (result.IsFailed)
            return Result.Fail<LazyLoadResponse<SimpleSubjectResponseDto>>(result.Errors);

        var mapped = result.Value.Select(simpleResponseMapper.Map);
        var response = new LazyLoadResponse<SimpleSubjectResponseDto>
        {
            LoadedCount = result.Value.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                $"subject-count",
                async (_) => (await countService.Count(null)).Value,
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
            Items = mapped,
        };

        return Result.Ok(response);
    }

    public async Task<Result<SubjectResponseDto>> GetSingle(int id, string languageCode)
    {
        if (id < 1 || string.IsNullOrWhiteSpace(languageCode))
            return Result.Fail<SubjectResponseDto>(new BadRequest("Invalid request"));

        var result = await readSingleService.Get(
            x => x.Id == id,
            q =>
                q.Include(x => x.Teachers.OrderByDescending(t => t.Id).Take(5))
                    .ThenInclude(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Teachers.OrderByDescending(t => t.Id).Take(5))
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Teachers.OrderByDescending(t => t.Id).Take(5))
                    .ThenInclude(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        if (result.IsFailed)
            return Result.Fail<SubjectResponseDto>(result.Errors);

        var mapped = responseMapper.Map(result.Value);

        mapped.Teachers.LoadedCount = result.Value.Teachers.Count;
        mapped.Teachers.TotalCount = await hybridCache.GetOrCreateAsync(
            $"subject-{mapped.Id}-teachers-count",
            async (_) =>
            {
                var result = await readSingleSelectedService.Get(
                    x => new { x.Teachers.Count },
                    x => x.Id == mapped.Id
                );

                return result.ValueOrDefault?.Count ?? 0;
            },
            new() { Expiration = TimeSpan.FromHours(6) }
        );
        mapped.Teachers.NextCursor =
            mapped.Teachers.LoadedCount < 5
                ? null
                : $"teacher/simple/for-subject/{mapped.Id}?languageCode={languageCode}&offset=5&limit=10";

        return Result.Ok(mapped);
    }

    public Task<Result<IEnumerable<AdminSubjectResponseDto>>> AdminGetAll(int? offset)
    {
        return readRangeSelectedService.Get(
            x => new AdminSubjectResponseDto
            {
                Id = x.Id,
                Name = x.Translations.First().Name,
                Description = x.Translations.First().Description,
                TeachersCount = x.Teachers.Count,
                Translations = x.Translations.Select(x => x.LanguageCode),
            },
            null,
            offset,
            10
        );
    }

    public Task<Result<AdminFullSubjectResponseDto>> AdminGetSingle(int id)
    {
        return readSingleSelectedService.Get(
            x => new AdminFullSubjectResponseDto()
            {
                Id = x.Id,
                Teachers = x.Teachers.Select(x => new SimpleTeacherResponseDto()
                {
                    Id = x.Id,
                    Name = x.Translations.First().Name,
                    TItle = x.Translations.First().Title,
                }),
                Translations = x.Translations.Select(
                    t => new Dtos.Response.Translations.TranslationWrapper<AdminFullSubjectTranslationDto>()
                    {
                        LanguageCode = t.LanguageCode,
                        Value = new AdminFullSubjectTranslationDto()
                        {
                            Name = t.Name,
                            Description = t.Description,
                        },
                    }
                ),
            },
            x => x.Id == id
        );
    }
}
