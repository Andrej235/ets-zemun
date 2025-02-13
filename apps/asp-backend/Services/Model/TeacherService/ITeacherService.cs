using EtsZemun.DTOs;
using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.DTOs.Response.Teacher;
using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public interface ITeacherService
{
    Task<Result> Create(CreateTeacherRequestDto request);
    Task<Result> CreateTranslation(CreateTeacherTranslationRequestDto request);

    Task<Result<LazyLoadResponse<TeacherResponseDto>>> GetAll(
        int languageId,
        int? offset,
        int? limit,
        int? subjectId
    );
    Task<Result<TeacherResponseDto>> GetSingle(int id, int languageId);

    Task<Result> Update(UpdateTeacherRequestDto request);
    Task<Result> UpdateTranslation(UpdateTeacherTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int teacherId, int languageId);
}
