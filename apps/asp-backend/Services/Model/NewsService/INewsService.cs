using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.News;
using EtsZemun.DTOs.Response.News;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public interface INewsService
{
    Task<Result> Create(CreateNewsRequestDto request);
    Task<Result> CreateTranslation(CreateNewsTranslationRequestDto request);

    Task<Result<LazyLoadResponse<NewsPreviewResponseDto>>> GetAll(
        string? languageCode,
        int? offset,
        int? limit
    );
    Task<Result<NewsResponseDto>> GetById(int id, string? languageCode);
    Task<Result<LazyLoadResponse<NewsImageResponseDto>>> GetImages(int id, int? offset, int? limit);

    Task<Result> Update(UpdateNewsRequestDto request);
    Task<Result> UpdateTranslation(UpdateNewsTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int id, string languageCode);
}
