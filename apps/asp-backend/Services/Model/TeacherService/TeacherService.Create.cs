using EtsZemun.DTOs.Request.Teacher;
using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService
{
    public async Task<Result> Create(CreateTeacherRequestDto request)
    {
        var newTeacher = await createSingleService.Add(createRequestMapper.Map(request));
        return newTeacher.IsFailed ? Result.Fail(newTeacher.Errors) : Result.Ok();
    }

    public async Task<Result> CreateTranslation(CreateTeacherTranslationRequestDto request)
    {
        var newTranslation = await createSingleTranslationService.Add(
            createTranslationRequestMapper.Map(request)
        );
        return newTranslation.IsFailed ? Result.Fail(newTranslation.Errors) : Result.Ok();
    }
}
