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
        string languageCode,
        int? offset,
        int? limit,
        string? search
    );
    Task<Result<LazyLoadResponse<SimpleTeacherResponseDto>>> GetAllSimple(
        string languageCode,
        int? offset,
        int? limit,
        string? search
    );
    Task<Result<TeacherResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> Update(UpdateTeacherRequestDto request);
    Task<Result> UpdateTranslation(UpdateTeacherTranslationRequestDto request);

    Task<Result> Delete(int id);
    Task<Result> DeleteTranslation(int teacherId, string languageCode);

    Task<Result> AddSubject(AddSubjectsToTeacherRequestDto request);
    Task<Result> RemoveSubject(int teacherId, int subjectId);
}
