using EtsZemun.Dtos.Request.Exam;
using FluentResults;

namespace EtsZemun.Services.Model.ExamService;

public partial class ExamService
{
    public async Task<Result> Create(CreateExamRequestDto request)
    {
        var newExam = await createService.Add(createRequestMapper.Map(request));
        if (newExam.IsFailed)
            return Result.Fail(newExam.Errors);

        return Result.Ok();
    }
}
