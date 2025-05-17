using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Errors;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.SubjectService;

public partial class SubjectService
{
    public async Task<Result> Create(CreateSubjectRequestDto request)
    {
        if (request.Translations.Count() < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        var newSubject = await createSingleService.Add(new());

        if (newSubject.IsFailed)
            return Result.Fail(newSubject.Errors);

        var newTranslations = await createRangeTranslationService.Add(
            request.Translations.Select(x => new SubjectTranslation()
            {
                SubjectId = newSubject.Value.Id,
                LanguageCode = x.LanguageCode,
                Name = x.Name,
                Description = x.Description,
            })
        );

        if (newTranslations.IsFailed)
            return Result.Fail(newTranslations.Errors);

        var teacherResult = await createTeacherSubjectService.Add(
            request.Teachers.Select(x => new TeacherSubject()
            {
                SubjectId = newSubject.Value.Id,
                TeacherId = x,
            })
        );

        if (teacherResult.IsFailed)
            return Result.Fail(teacherResult.Errors);

        return Result.Ok();
    }

    public async Task<Result> CreateTranslation(CreateSubjectTranslationRequestDto request)
    {
        if (request.SubjectId < 1 || string.IsNullOrWhiteSpace(request.LanguageCode))
            return Result.Fail(new BadRequest("Invalid request"));

        var newTranslation = await createSingleTranslationService.Add(
            createTranslationMapper.Map(request)
        );

        if (newTranslation.IsFailed)
            return Result.Fail(newTranslation.Errors);

        return Result.Ok();
    }
}
