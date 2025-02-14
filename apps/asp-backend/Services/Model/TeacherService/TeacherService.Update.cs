using EtsZemun.DTOs.Request.Teacher;
using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService : ITeacherService
{
    public async Task<Result> Update(UpdateTeacherRequestDto request)
    {
        var teacherResult = await readSingleService.Get(x => x.Id == request.Id);

        if (teacherResult.IsFailed)
            return Result.Fail(teacherResult.Errors);

        var teacher = teacherResult.Value;
        teacher.Email = request.Email;
        teacher.Image = request.Image;
        teacher.StartOfOpenOfficeHoursFirstShift = request.StartOfOpenOfficeHoursFirstShift;
        teacher.StartOfOpenOfficeHoursSecondShift = request.StartOfOpenOfficeHoursSecondShift;

        var updateResult = await updateService.Update(teacher);
        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        return Result.Ok();
    }

    public async Task<Result> UpdateTranslation(UpdateTeacherTranslationRequestDto request)
    {
        var updateResult = await updateTranslationService.Update(
            x => x.LanguageId == request.LanguageId && x.TeacherId == request.TeacherId,
            x =>
                x.SetProperty(x => x.Name, request.Name)
                    .SetProperty(x => x.Bio, request.Bio)
                    .SetProperty(x => x.Title, request.Title)
        );

        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        return Result.Ok();
    }
}
