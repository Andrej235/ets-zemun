using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
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
    IUpdateRangeService<SubjectTranslation> updateRangeTranslationService,
    IExecuteUpdateService<SubjectTranslation> updateTranslationService,
    IDeleteService<Subject> deleteService,
    IDeleteService<SubjectTranslation> deleteTranslationService,
    IDeleteService<TeacherSubject> deleteTeacherSubjectService,
    IRequestMapper<CreateSubjectTranslationRequestDto, SubjectTranslation> createTranslationMapper,
    IResponseMapper<Subject, SubjectResponseDto> responseMapper,
    IResponseMapper<Subject, SimpleSubjectResponseDto> simpleResponseMapper,
    HybridCache hybridCache
) : ISubjectService;
