using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Award;
using EtsZemun.DTOs.Response.Award;
using FluentResults;

namespace EtsZemun.Services.Model.AwardService;

public interface IAwardService
{
    Task<Result> Create(CreateAwardRequestDto request);
    Task<Result> CreateTranslation(CreateAwardTranslationRequestDto request);

    Task<Result<LazyLoadResponse<AwardResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    );
    Task<Result<AwardResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> Update(UpdateAwardRequestDto request);
    Task<Result> UpdateTranslation(UpdateAwardTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int awardId, string languageCode);
}
