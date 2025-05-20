using EtsZemun.Dtos.Request.Award;
using EtsZemun.Dtos.Response.Award;
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
    IReadSingleSelectedService<Award> readSingleSelectedService,
    IReadRangeService<Award> readRangeService,
    IReadRangeSelectedService<Award> readRangeSelectedService,
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
) : IAwardService;
