using EtsZemun.Dtos.Request.Teacher;
using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using Microsoft.Extensions.Caching.Hybrid;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService(
    ICreateSingleService<Teacher> createSingleService,
    ICreateSingleService<TeacherTranslation> createSingleTranslationService,
    ICreateRangeService<TeacherSubject> createTeacherSubjectService,
    IReadSingleService<Teacher> readSingleService,
    IReadRangeService<Teacher> readRangeService,
    IReadRangeSelectedService<Teacher> readRangeSelectedService,
    ICountService<Teacher> countService,
    IUpdateSingleService<Teacher> updateService,
    IExecuteUpdateService<TeacherTranslation> updateTranslationService,
    IDeleteService<Teacher> deleteService,
    IDeleteService<TeacherSubject> deleteTeacherSubjectService,
    IDeleteService<TeacherTranslation> deleteTranslationService,
    IRequestMapper<CreateTeacherRequestDto, Teacher> createRequestMapper,
    IRequestMapper<
        CreateTeacherTranslationRequestDto,
        TeacherTranslation
    > createTranslationRequestMapper,
    IResponseMapper<Teacher, TeacherResponseDto> responseMapper,
    IResponseMapper<Teacher, SimpleTeacherResponseDto> simpleResponseMapper,
    HybridCache hybridCache
) : ITeacherService;
