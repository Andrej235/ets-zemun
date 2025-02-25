using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Subject;
using EtsZemun.DTOs.Response.Subject;
using EtsZemun.Errors;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using FluentResults;
using Microsoft.Extensions.Caching.Hybrid;

namespace EtsZemun.Services.Model.SubjectService;

public class SubjectService(
    ICreateSingleService<Subject> createSingleService,
    ICreateSingleService<SubjectTranslation> createSingleTranslationService,
    IReadSingleService<Subject> readSingleService,
    IReadSingleSelectedService<Subject> readSingleSelectedService,
    ICountService<Subject> countService,
    IReadRangeService<Subject> readRangeService,
    IExecuteUpdateService<SubjectTranslation> updateTranslationService,
    IDeleteService<Subject> deleteService,
    IDeleteService<SubjectTranslation> deleteTranslationService,
    IRequestMapper<CreateSubjectTranslationRequestDto, SubjectTranslation> createTranslationMapper,
    IResponseMapper<Subject, SubjectResponseDto> responseMapper,
    HybridCache hybridCache
) : ISubjectService
{
    private readonly ICreateSingleService<Subject> createSingleService = createSingleService;
    private readonly ICreateSingleService<SubjectTranslation> createSingleTranslationService =
        createSingleTranslationService;
    private readonly IReadSingleService<Subject> readSingleService = readSingleService;
    private readonly IReadSingleSelectedService<Subject> readSingleSelectedService =
        readSingleSelectedService;
    private readonly ICountService<Subject> countService = countService;
    private readonly IReadRangeService<Subject> readRangeService = readRangeService;
    private readonly IExecuteUpdateService<SubjectTranslation> updateTranslationService =
        updateTranslationService;
    private readonly IDeleteService<Subject> deleteService = deleteService;
    private readonly IDeleteService<SubjectTranslation> deleteTranslationService =
        deleteTranslationService;
    private readonly IRequestMapper<
        CreateSubjectTranslationRequestDto,
        SubjectTranslation
    > createTranslationMapper = createTranslationMapper;
    private readonly IResponseMapper<Subject, SubjectResponseDto> responseMapper = responseMapper;
    private readonly HybridCache hybridCache = hybridCache;

    public async Task<Result> Create(CreateSubjectRequestDto request)
    {
        var newSubject = await createSingleService.Add(new());

        if (newSubject.IsFailed)
            return Result.Fail(newSubject.Errors);

        var newTranslation = await createSingleTranslationService.Add(
            new()
            {
                SubjectId = newSubject.Value.Id,
                LanguageCode = request.LanguageCode,
                Name = request.Name,
                Description = request.Description,
            }
        );

        if (newTranslation.IsFailed)
            return Result.Fail(newTranslation.Errors);

        return Result.Ok();
    }

    public async Task<Result> CreateTranslation(CreateSubjectTranslationRequestDto request)
    {
        if (request.SubjectId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode))
            return Result.Fail(new BadRequest("Invalid request"));

        var newTranslation = await createSingleTranslationService.Add(
            createTranslationMapper.Map(request)
        );

        if (newTranslation.IsFailed)
            return Result.Fail(newTranslation.Errors);

        return Result.Ok();
    }

    public Task<Result> Delete(int id)
    {
        if (id < 1)
            return Task.FromResult(Result.Fail(new BadRequest("Invalid request")));

        return deleteService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteTranslation(int subjectId, string languageCode)
    {
        if (subjectId < 1 || string.IsNullOrWhiteSpace(languageCode))
            return Task.FromResult(Result.Fail(new BadRequest("Invalid request")));

        return deleteTranslationService.Delete(x =>
            x.SubjectId == subjectId && x.LanguageCode == languageCode
        );
    }

    public async Task<Result<LazyLoadResponse<SubjectResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    )
    {
        if (string.IsNullOrWhiteSpace(languageCode))
            return Result.Fail<LazyLoadResponse<SubjectResponseDto>>(
                new BadRequest("Invalid request")
            );

        var result = await readRangeService.Get(
            null,
            offset,
            limit,
            q =>
                q.Include(x => x.Teachers.OrderBy(t => t.Id).Take(5))
                    .ThenInclude(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Teachers)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Teachers)
                    .ThenInclude(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderByDescending(t => t.Id)
        );

        if (result.IsFailed)
            return Result.Fail<LazyLoadResponse<SubjectResponseDto>>(result.Errors);

        var mapped = result.Value.Select(async subject =>
        {
            var mapped = responseMapper.Map(subject);
            mapped.Teachers.LoadedCount = subject.Teachers.Count;
            mapped.Teachers.TotalCount = await hybridCache.GetOrCreateAsync(
                $"subject-{subject.Id}-teachers-count",
                async (_) =>
                {
                    var result = await readSingleSelectedService.Get(
                        x => new { x.Teachers.Count },
                        x => x.Id == subject.Id
                    );

                    var count = result.ValueOrDefault?.Count;
                    return count ?? 0;
                },
                new() { Expiration = TimeSpan.FromHours(6) }
            );
            mapped.Teachers.NextCursor =
                mapped.Teachers.LoadedCount < 5
                    ? null
                    : $"teacher?languageCode={languageCode}&offset=5&limit=10&subjectId={subject.Id}";

            return mapped;
        });

        var response = new LazyLoadResponse<SubjectResponseDto>
        {
            LoadedCount = result.Value.Count(),
            TotalCount = await hybridCache.GetOrCreateAsync(
                $"subject-count",
                async (_) => (await countService.Count(null)).Value,
                new() { Expiration = TimeSpan.FromHours(6) }
            ),
            Items = await Task.WhenAll(mapped),
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
                q.Include(x => x.Teachers.OrderBy(t => t.Id).Take(5))
                    .ThenInclude(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Teachers)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Teachers)
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
                : $"teacher?languageCode={languageCode}&offset=5&limit=10&subjectId={mapped.Id}";

        return Result.Ok(mapped);
    }

    public Task<Result> UpdateTranslation(UpdateSubjectTranslationRequestDto request)
    {
        if (request.SubjectId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode))
            return Task.FromResult(Result.Fail(new BadRequest("Invalid request")));

        return updateTranslationService.Update(
            x => x.LanguageCode == request.LanguageCode && x.SubjectId == request.SubjectId,
            x =>
                x.SetProperty(x => x.Name, request.Name)
                    .SetProperty(x => x.Description, request.Description)
        );
    }
}
