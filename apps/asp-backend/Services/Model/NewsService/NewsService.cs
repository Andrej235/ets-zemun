using EtsZemun.Dtos.Request.News;
using EtsZemun.Dtos.Response.News;
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
    ICreateRangeService<NewsImage> createRangeImageService,
    ICreateSingleService<NewsTranslation> createTranslationService,
    IReadRangeService<News> readService,
    IReadRangeSelectedService<News> readSelectedService,
    IReadRangeService<NewsImage> readImageService,
    IReadSingleService<News> readSingleService,
    IReadSingleSelectedService<News> readSingleSelectedService,
    ICountService<News> countService,
    ICountService<NewsImage> imageCountService,
    IExecuteUpdateService<News> updateService,
    IExecuteUpdateService<NewsTranslation> updateTranslationService,
    IDeleteService<News> deleteService,
    IDeleteService<NewsImage> deleteImageService,
    IDeleteService<NewsTranslation> deleteTranslationService,
    IRequestMapper<CreateNewsRequestDto, News> createRequestMapper,
    IRequestMapper<CreateNewsTranslationRequestDto, NewsTranslation> createTranslationRequestMapper,
    IResponseMapper<News, NewsPreviewResponseDto> responsePreviewMapper,
    IResponseMapper<News, NewsResponseDto> responseMapper,
    HybridCache hybridCache
) : INewsService;
