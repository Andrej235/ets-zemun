using EtsZemun.Dtos.Request.Qualification;
using EtsZemun.Dtos.Response.Qualification;
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
    IExecuteUpdateService<Qualification> updateQualificationService,
    IExecuteUpdateService<QualificationTranslation> updateQualificationTranslationService,
    IUpdateRangeService<QualificationTranslation> updateRangeTranslationService,
    IDeleteService<Qualification> deleteQualificationService,
    IDeleteService<QualificationTranslation> deleteQualificationTranslationService,
    IRequestMapper<CreateQualificationRequestDto, Qualification> createRequestMapper,
    IRequestMapper<
        CreateQualificationTranslationRequestDto,
        QualificationTranslation
    > createTranslationRequestMapper,
    IResponseMapper<Qualification, QualificationResponseDto> responseMapper,
    HybridCache hybridCache
) : IQualificationService;
