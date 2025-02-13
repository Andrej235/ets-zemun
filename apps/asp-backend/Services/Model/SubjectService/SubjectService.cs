using EtsZemun.DTOs.Request.Subject;
using EtsZemun.DTOs.Response.Subject;
using EtsZemun.DTOs.Response.Teacher;
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
                LanguageId = request.LanguageId,
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
        if (request.SubjectId < 1 || request.LanguageId < 1)
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

    public Task<Result> DeleteTranslation(int subjectId, int languageId)
    {
        if (subjectId < 1 || languageId < 1)
            return Task.FromResult(Result.Fail(new BadRequest("Invalid request")));

        return deleteTranslationService.Delete(x =>
            x.SubjectId == subjectId && x.LanguageId == languageId
        );
    }

    public async Task<Result<IEnumerable<SubjectResponseDto>>> GetAll(int languageId)
    {
        if (languageId < 1)
            return Result.Fail<IEnumerable<SubjectResponseDto>>(new BadRequest("Invalid request"));

        var result = await readRangeService.Get(
            _ => true,
            null,
            null,
            q =>
                q.Include(x => x.Teachers.OrderBy(t => t.Id).Take(5))
                    .ThenInclude(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Teachers)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Teachers)
                    .ThenInclude(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Translations.Where(t => t.LanguageId == languageId))
        );

        if (result.IsFailed)
            return Result.Fail<IEnumerable<SubjectResponseDto>>(result.Errors);

        var mapped = result.Value.Select(responseMapper.Map);

        foreach (var subject in mapped)
        {
            subject.Teachers.LoadedCount = subject.Teachers.Items.Count();
            subject.Teachers.TotalCount = await hybridCache.GetOrCreateAsync(
                $"subject-{subject.Id}-teachers-count",
                async (_) =>
                {
                    var result = await readSingleSelectedService.Get(
                        x => new { x.Teachers.Count },
                        x => x.Id == subject.Id
                    );

                    return result.ValueOrDefault?.Count ?? 0;
                },
                new() { Expiration = TimeSpan.FromHours(6) }
            );
        }

        return Result.Ok(mapped);
    }

    public async Task<Result<SubjectResponseDto>> GetSingle(int id, int languageId)
    {
        if (id < 1 || languageId < 1)
            return Result.Fail<SubjectResponseDto>(new BadRequest("Invalid request"));

        var result = await readSingleService.Get(
            x => x.Id == id,
            q =>
                q.Include(x => x.Teachers.OrderBy(t => t.Id).Take(5))
                    .ThenInclude(x => x.Subjects)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Teachers)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Teachers)
                    .ThenInclude(x => x.Qualifications)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageId == languageId))
                    .Include(x => x.Translations.Where(t => t.LanguageId == languageId))
        );

        if (result.IsFailed)
            return Result.Fail<SubjectResponseDto>(result.Errors);

        var mapped = responseMapper.Map(result.Value);

        mapped.Teachers.LoadedCount = mapped.Teachers.Items.Count();
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

        return Result.Ok(mapped);
    }

    public Task<Result> UpdateTranslation(UpdateSubjectTranslationRequestDto request)
    {
        if (request.SubjectId < 1 || request.LanguageId < 1)
            return Task.FromResult(Result.Fail(new BadRequest("Invalid request")));

        return updateTranslationService.Update(
            x => x.LanguageId == request.LanguageId && x.SubjectId == request.SubjectId,
            x =>
                x.SetProperty(x => x.Name, request.Name)
                    .SetProperty(x => x.Description, request.Description)
        );
    }
}
