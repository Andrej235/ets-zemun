using EtsZemun.DTOs.Request.Award;
using EtsZemun.DTOs.Response.Award;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using Microsoft.Extensions.Caching.Hybrid;

namespace EtsZemun.Services.Model.AwardService;

public partial class AwardService(
    ICreateSingleService<Award> createSingleService,
    ICreateSingleService<AwardTranslation> createSingleTranslationService,
    IReadSingleService<Award> readSingleService,
    IReadRangeService<Award> readRangeService,
    ICountService<Award> countService,
    IUpdateSingleService<Award> updateSingleService,
    IUpdateSingleService<AwardTranslation> updateTranslationSingleService,
    IDeleteService<Award> deleteService,
    IDeleteService<AwardTranslation> deleteTranslationService,
    IRequestMapper<CreateAwardRequestDto, Award> createRequestMapper,
    IRequestMapper<UpdateAwardRequestDto, Award> updateRequestMapper,
    IRequestMapper<
        CreateAwardTranslationRequestDto,
        AwardTranslation
    > createTranslationRequestMapper,
    IRequestMapper<
        UpdateAwardTranslationRequestDto,
        AwardTranslation
    > updateTranslationRequestMapper,
    IResponseMapper<Award, AwardResponseDto> responseMapper,
    HybridCache hybridCache
) : IAwardService
{
    private readonly ICreateSingleService<Award> createSingleService = createSingleService;
    private readonly ICreateSingleService<AwardTranslation> createSingleTranslationService =
        createSingleTranslationService;
    private readonly IReadSingleService<Award> readSingleService = readSingleService;
    private readonly IReadRangeService<Award> readRangeService = readRangeService;
    private readonly ICountService<Award> countService = countService;
    private readonly IUpdateSingleService<Award> updateSingleService = updateSingleService;
    private readonly IUpdateSingleService<AwardTranslation> updateTranslationSingleService =
        updateTranslationSingleService;
    private readonly IDeleteService<Award> deleteService = deleteService;
    private readonly IDeleteService<AwardTranslation> deleteTranslationService =
        deleteTranslationService;
    private readonly IRequestMapper<CreateAwardRequestDto, Award> createRequestMapper =
        createRequestMapper;
    private readonly IRequestMapper<UpdateAwardRequestDto, Award> updateRequestMapper =
        updateRequestMapper;
    private readonly IRequestMapper<
        CreateAwardTranslationRequestDto,
        AwardTranslation
    > createTranslationRequestMapper = createTranslationRequestMapper;
    private readonly IRequestMapper<
        UpdateAwardTranslationRequestDto,
        AwardTranslation
    > updateTranslationRequestMapper = updateTranslationRequestMapper;
    private readonly IResponseMapper<Award, AwardResponseDto> responseMapper = responseMapper;
    private readonly HybridCache hybridCache = hybridCache;
}
