using EtsZemun.DTOs.Request.News;
using EtsZemun.DTOs.Response.News;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using Microsoft.Extensions.Caching.Hybrid;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService(
    ICreateSingleService<News> createService,
    ICreateSingleService<NewsTranslation> createTranslationService,
    IReadRangeService<News> readService,
    IReadSingleService<News> readSingleService,
    ICountService<News> countService,
    ICountService<NewsImage> imageCountService,
    IExecuteUpdateService<News> updateService,
    IExecuteUpdateService<NewsTranslation> updateTranslationService,
    IDeleteService<News> deleteService,
    IDeleteService<NewsTranslation> deleteTranslationService,
    IRequestMapper<CreateNewsRequestDto, News> createRequestMapper,
    IRequestMapper<CreateNewsTranslationRequestDto, NewsTranslation> createTranslationRequestMapper,
    IResponseMapper<News, NewsPreviewResponseDto> responsePreviewMapper,
    IResponseMapper<News, NewsResponseDto> responseMapper,
    HybridCache hybridCache
) : INewsService
{
    private readonly ICreateSingleService<News> createService = createService;
    private readonly ICreateSingleService<NewsTranslation> createTranslationService =
        createTranslationService;
    private readonly IReadRangeService<News> readService = readService;
    private readonly IReadSingleService<News> readSingleService = readSingleService;
    private readonly ICountService<News> countService = countService;
    private readonly ICountService<NewsImage> imageCountService = imageCountService;
    private readonly IExecuteUpdateService<News> updateService = updateService;
    private readonly IExecuteUpdateService<NewsTranslation> updateTranslationService =
        updateTranslationService;
    private readonly IDeleteService<News> deleteService = deleteService;
    private readonly IDeleteService<NewsTranslation> deleteTranslationService =
        deleteTranslationService;
    private readonly IRequestMapper<CreateNewsRequestDto, News> createRequestMapper =
        createRequestMapper;
    private readonly IRequestMapper<
        CreateNewsTranslationRequestDto,
        NewsTranslation
    > createTranslationRequestMapper = createTranslationRequestMapper;
    private readonly IResponseMapper<News, NewsPreviewResponseDto> responsePreviewMapper =
        responsePreviewMapper;
    private readonly IResponseMapper<News, NewsResponseDto> responseMapper = responseMapper;
    private readonly HybridCache hybridCache = hybridCache;
}
