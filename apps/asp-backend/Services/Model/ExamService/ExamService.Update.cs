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

        var updateResult = await updateService.Update(
            x => x.Id == request.Id,
            x =>
                x.SetProperty(x => x.StartTime, request.StartTime)
                    .SetProperty(x => x.Cabinet, request.Cabinet)
                    .SetProperty(x => x.Subject, request.Subject)
                    .SetProperty(x => x.Commission, request.Commission)
                    .SetProperty(x => x.Date, request.Date)
        );
        return updateResult.IsFailed ? Result.Fail(updateResult.Errors) : Result.Ok();
    }
}
