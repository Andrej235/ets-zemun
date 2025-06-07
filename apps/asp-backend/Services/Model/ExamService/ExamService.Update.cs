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

        var deleteResult = await commisionMemberDeleteService.Delete(
            x => x.ExamId == request.Id,
            false
        );
        if (deleteResult.IsFailed)
            return Result.Fail(deleteResult.Errors);

        var createResult = await commisionMemberCreateService.Add(
            request.Commission.Select(x => new Models.ExamCommissionMember()
            {
                ExamId = request.Id,
                TeacherId = x,
            })
        );
        if (createResult.IsFailed)
            return Result.Fail(createResult.Errors);

        var updateResult = await updateService.Update(
            x => x.Id == request.Id,
            x =>
                x.SetProperty(
                        x => x.StartTime,
                        DateTime.SpecifyKind(request.StartTime, DateTimeKind.Utc)
                    )
                    .SetProperty(x => x.Cabinet, request.Cabinet)
                    .SetProperty(x => x.SubjectId, request.SubjectId)
        );
        return updateResult.IsFailed ? Result.Fail(updateResult.Errors) : Result.Ok();
    }
}
