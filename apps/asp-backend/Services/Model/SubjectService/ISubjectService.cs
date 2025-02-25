using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Subject;
using EtsZemun.DTOs.Response.Subject;
using FluentResults;

namespace EtsZemun.Services.Model.SubjectService;

public interface ISubjectService
{
    Task<Result> Create(CreateSubjectRequestDto request);
    Task<Result> CreateTranslation(CreateSubjectTranslationRequestDto request);

    Task<Result<LazyLoadResponse<SubjectResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    );
    Task<Result<SubjectResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> UpdateTranslation(UpdateSubjectTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int subjectId, string languageCode);
}
