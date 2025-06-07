using EtsZemun.Dtos.Request.Caption;
using EtsZemun.Dtos.Response.Captions;
using FluentResults;

namespace EtsZemun.Services.Model.CaptionService;

public interface ICaptionService
{
    Task<Result> Create(CreateCaptionRequestDto request);
    Task<Result> CreateTranslation(CaptionTranslationRequestDto request);
    Task<Result<IEnumerable<AdminCaptionResponseDto>>> AdminGetAll();
    Task<Result<AdminCaptionResponseDto>> AdminGetSingle(int id);
    Task<Result<CaptionResponseDto>> GetSingle(int id, string languageCode);
    Task<Result> Update(UpdateCaptionRequestDto request);
    Task<Result> Delete(int id);
}
