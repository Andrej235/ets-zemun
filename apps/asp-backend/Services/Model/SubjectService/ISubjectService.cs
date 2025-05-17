using EtsZemun.Dtos;
using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Dtos.Response.Subject;
using FluentResults;

namespace EtsZemun.Services.Model.SubjectService;

public interface ISubjectService
{
    Task<Result> Create(CreateSubjectRequestDto request);
    Task<Result> CreateTranslation(CreateSubjectTranslationRequestDto request);

    Task<Result<LazyLoadResponse<SimpleSubjectResponseDto>>> GetAll(
        string languageCode,
        int? offset,
        int? limit
    );
    Task<Result<SubjectResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> Update(UpdateSubjectRequestDto request);
    Task<Result> UpdateTranslation(UpdateSubjectTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int subjectId, string languageCode);

    Task<Result<IEnumerable<AdminSubjectResponseDto>>> AdminGetAll(int? offset);
    Task<Result<AdminFullSubjectResponseDto>> AdminGetSingle(int id);
}
