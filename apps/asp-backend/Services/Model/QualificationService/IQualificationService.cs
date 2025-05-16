using EtsZemun.Dtos;
using EtsZemun.Dtos.Request.Qualification;
using EtsZemun.Dtos.Response.Qualification;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public interface IQualificationService
{
    Task<Result> Create(CreateQualificationRequestDto request);
    Task<Result> CreateTranslation(CreateQualificationTranslationRequestDto request);

    Task<Result<LazyLoadResponse<QualificationResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit,
        int? teacherId
    );
    Task<Result<QualificationResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> UpdateTranslation(UpdateQualificationTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int qualificationId, string languageCode);
}
