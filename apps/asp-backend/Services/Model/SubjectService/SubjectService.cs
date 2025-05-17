using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Dtos.Response.Subject;
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

public partial class SubjectService(
    ICreateSingleService<Subject> createSingleService,
    ICreateSingleService<SubjectTranslation> createSingleTranslationService,
    ICreateRangeService<SubjectTranslation> createRangeTranslationService,
    ICreateRangeService<TeacherSubject> createTeacherSubjectService,
    IReadSingleService<Subject> readSingleService,
    IReadSingleSelectedService<Subject> readSingleSelectedService,
    ICountService<Subject> countService,
    IReadRangeService<Subject> readRangeService,
    IReadRangeSelectedService<Subject> readRangeSelectedService,
    IExecuteUpdateService<SubjectTranslation> updateTranslationService,
    IDeleteService<Subject> deleteService,
    IDeleteService<SubjectTranslation> deleteTranslationService,
    IRequestMapper<CreateSubjectTranslationRequestDto, SubjectTranslation> createTranslationMapper,
    IResponseMapper<Subject, SubjectResponseDto> responseMapper,
    IResponseMapper<Subject, SimpleSubjectResponseDto> simpleResponseMapper,
    HybridCache hybridCache
) : ISubjectService
{
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
