using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.DTOs.Response.Qualification;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using Microsoft.Extensions.Caching.Hybrid;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService(
    ICreateSingleService<Qualification> createQualificationService,
    ICreateSingleService<QualificationTranslation> createQualificationTranslationService,
    IReadSingleService<Qualification> readQualificationService,
    IReadRangeService<Qualification> readRangeService,
    ICountService<Qualification> countQualificationService,
    IUpdateSingleService<QualificationTranslation> updateSingleQualificationTranslationService,
    IDeleteService<Qualification> deleteQualificationService,
    IDeleteService<QualificationTranslation> deleteQualificationTranslationService,
    IRequestMapper<CreateQualificationRequestDto, Qualification> createRequestMapper,
    IRequestMapper<
        CreateQualificationTranslationRequestDto,
        QualificationTranslation
    > createTranslationRequestMapper,
    IResponseMapper<Qualification, QualificationResponseDto> responseMapper,
    HybridCache hybridCache
) : IQualificationService
{
    private readonly ICreateSingleService<Qualification> createQualificationService =
        createQualificationService;
    private readonly ICreateSingleService<QualificationTranslation> createQualificationTranslationService =
        createQualificationTranslationService;
    private readonly IReadSingleService<Qualification> readQualificationService =
        readQualificationService;
    private readonly IReadRangeService<Qualification> readRangeService = readRangeService;
    private readonly ICountService<Qualification> countQualificationService =
        countQualificationService;
    private readonly IUpdateSingleService<QualificationTranslation> updateSingleQualificationTranslationService =
        updateSingleQualificationTranslationService;
    private readonly IDeleteService<Qualification> deleteQualificationService =
        deleteQualificationService;
    private readonly IDeleteService<QualificationTranslation> deleteQualificationTranslationService =
        deleteQualificationTranslationService;
    private readonly IRequestMapper<
        CreateQualificationRequestDto,
        Qualification
    > createRequestMapper = createRequestMapper;
    private readonly IRequestMapper<
        CreateQualificationTranslationRequestDto,
        QualificationTranslation
    > createTranslationRequestMapper = createTranslationRequestMapper;
    private readonly IResponseMapper<Qualification, QualificationResponseDto> responseMapper =
        responseMapper;
    private readonly HybridCache hybridCache = hybridCache;
}
