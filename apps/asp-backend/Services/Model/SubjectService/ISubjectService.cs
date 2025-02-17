using EtsZemun.DTOs.Request.Subject;
using EtsZemun.DTOs.Response.Subject;
using FluentResults;

namespace EtsZemun.Services.Model.SubjectService;

public interface ISubjectService
{
    Task<Result> Create(CreateSubjectRequestDto request);
    Task<Result> CreateTranslation(CreateSubjectTranslationRequestDto request);

    Task<Result<IEnumerable<SubjectResponseDto>>> GetAll(string languageCode);
    Task<Result<SubjectResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> UpdateTranslation(UpdateSubjectTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int subjectId, string languageCode);
}
