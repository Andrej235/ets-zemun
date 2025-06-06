using EtsZemun.Dtos;
using EtsZemun.Dtos.Request.News;
using EtsZemun.Dtos.Response.News;
using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public interface INewsService
{
    Task<Result> Create(CreateNewsRequestDto request);
    Task<Result> CreateTranslation(CreateNewsTranslationRequestDto request);

    Task<Result<LazyLoadResponse<NewsPreviewResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    );
    Task<Result<NewsResponseDto>> GetById(int id, string languageCode);
    Task<Result<NewsPreviewResponseDto>> GetPreviewById(int id, string languageCode);

    Task<Result<IEnumerable<AdminNewsPreviewResponseDto>>> AdminGetAll(int? offset, int? limit);
    Task<Result<AdminNewsResponseDto>> AdminGetById(int id);
    Task<Result<NewsPreviewResponseDto>> AdminGetPreviewById(int id, string languageCode);

    Task<Result> Update(UpdateNewsRequestDto request);
    Task<Result> Approve(int id);
    Task<Result> Disapprove(int id);
    Task<Result> UpdateTranslation(UpdateNewsTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int id, string languageCode);
}
