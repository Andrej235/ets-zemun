using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.DTOs.Response.Teacher;
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
    HybridCache hybridCache
) : ITeacherService
{
    private readonly ICreateSingleService<Teacher> createSingleService = createSingleService;
    private readonly ICreateSingleService<TeacherTranslation> createSingleTranslationService =
        createSingleTranslationService;
    private readonly ICreateRangeService<TeacherSubject> createTeacherSubjectService =
        createTeacherSubjectService;
    private readonly IReadSingleService<Teacher> readSingleService = readSingleService;
    private readonly IReadRangeService<Teacher> readRangeService = readRangeService;
    private readonly ICountService<Teacher> countService = countService;
    private readonly IUpdateSingleService<Teacher> updateService = updateService;
    private readonly IExecuteUpdateService<TeacherTranslation> updateTranslationService =
        updateTranslationService;
    private readonly IDeleteService<Teacher> deleteService = deleteService;
    private readonly IDeleteService<TeacherSubject> deleteTeacherSubjectService =
        deleteTeacherSubjectService;
    private readonly IDeleteService<TeacherTranslation> deleteTranslationService =
        deleteTranslationService;
    private readonly IRequestMapper<CreateTeacherRequestDto, Teacher> createRequestMapper =
        createRequestMapper;
    private readonly IRequestMapper<
        CreateTeacherTranslationRequestDto,
        TeacherTranslation
    > createTranslationRequestMapper = createTranslationRequestMapper;
    private readonly IResponseMapper<Teacher, TeacherResponseDto> responseMapper = responseMapper;
    private readonly HybridCache hybridCache = hybridCache;
}
