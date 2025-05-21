using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Errors;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.SubjectService;

public partial class SubjectService
{
    public async Task<Result> Update(UpdateSubjectRequestDto request)
    {
        if (request.Id < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        var updateResult = await updateRangeTranslationService.Update(
            request.Translations.Select(x => new SubjectTranslation()
            {
                Name = x.Name,
                Description = x.Description,
                LanguageCode = x.LanguageCode,
                SubjectId = request.Id,
            })
        );

        if (updateResult.IsFailed)
            return Result.Fail(updateResult.Errors);

        var deleteTeachersResult = await deleteTeacherSubjectService.Delete(
            x => x.SubjectId == request.Id,
            false
        );
        if (deleteTeachersResult.IsFailed)
            return Result.Fail(deleteTeachersResult.Errors);

        var createTeachersResult = await createTeacherSubjectService.Add(
            request.Teachers.Select(x => new TeacherSubject()
            {
                SubjectId = request.Id,
                TeacherId = x,
            })
        );

        if (createTeachersResult.IsFailed)
            return Result.Fail(createTeachersResult.Errors);

        return Result.Ok();
    }

    public Task<Result> UpdateTranslation(UpdateSubjectTranslationRequestDto request)
    {
        if (request.SubjectId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode))
            return Task.FromResult(Result.Fail(new BadRequest("Invalid request")));

        return updateTranslationService.Update(
            x => x.LanguageCode == request.LanguageCode && x.SubjectId == request.SubjectId,
            x =>
                x.SetProperty(x => x.Name, request.Name)
                    .SetProperty(x => x.Description, request.Description)
        );
    }
}
