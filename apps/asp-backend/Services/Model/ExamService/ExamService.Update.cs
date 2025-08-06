using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.Model.ExamService;

public partial class ExamService
{
    public async Task<Result> Update(UpdateExamRequestDto request)
    {
        if (request.Id < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        var updateResult = await updateService.Update(updateRequestMapper.Map(request));
        return updateResult.IsFailed ? Result.Fail(updateResult.Errors) : Result.Ok();
    }
}
