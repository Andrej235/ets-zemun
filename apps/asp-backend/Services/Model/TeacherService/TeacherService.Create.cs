using EtsZemun.Dtos.Request.Teacher;
using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService
{
    public async Task<Result> Create(CreateTeacherRequestDto request)
    {
        var newTeacher = await createSingleService.Add(createRequestMapper.Map(request));
        if (newTeacher.IsFailed)
            return Result.Fail(newTeacher.Errors);

        await hybridCache.RemoveAsync("subject--1-teachers-count");
        return Result.Ok();
    }

    public async Task<Result> CreateTranslation(CreateTeacherTranslationRequestDto request)
    {
        var newTranslation = await createSingleTranslationService.Add(
            createTranslationRequestMapper.Map(request)
        );
        return newTranslation.IsFailed ? Result.Fail(newTranslation.Errors) : Result.Ok();
    }
}
