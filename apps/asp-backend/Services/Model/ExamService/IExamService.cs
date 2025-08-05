using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Dtos.Response.Exam;
using FluentResults;

namespace EtsZemun.Services.Model.ExamService;

public interface IExamService
{
    Task<Result> Create(CreateExamRequestDto request);
    Task<Result<IEnumerable<ExamResponseDto>>> GetAll(string languageCode);
    Task<Result<ExamResponseDto>> AdminGetSingle(int id);
    Task<Result> Update(UpdateExamRequestDto request);
    Task<Result> Delete(int id);
    Task<Result> DeleteAll();
}
