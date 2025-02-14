using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.DTOs.Response.Qualification;
using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public interface IQualificationService
{
    Task<Result> Create(CreateQualificationRequestDto request);
    Task<Result> CreateTranslation(CreateQualificationTranslationRequestDto request);

    Task<Result<LazyLoadResponse<QualificationResponseDto>>> GetAll(
        int languageId,
        int? offset,
        int? limit,
        int? teacherId
    );
    Task<Result<QualificationResponseDto>> GetSingle(int id, int languageId);

    Task<Result> UpdateTranslation(UpdateQualificationTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int qualificationId, int languageId);
}
