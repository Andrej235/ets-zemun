using EtsZemun.Dtos.Request.Caption;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;

namespace EtsZemun.Services.Model.CaptionService;

public partial class CaptionService(
    ICreateSingleService<Caption> createService,
    IReadRangeSelectedService<Caption> readRangeSelectedService,
    IReadSingleSelectedService<Caption> readSingleSelectedService,
    IExecuteUpdateService<Caption> updateService,
    IUpdateRangeService<CaptionTranslation> updateTranslationService,
    IDeleteService<Caption> deleteService,
    IRequestMapper<CreateCaptionRequestDto, Caption> createRequestMapper
) : ICaptionService;
