using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.Model.SubjectService;

public partial class SubjectService
{
    public async Task<Result> Delete(int id)
    {
        if (id < 1)
            return Result.Fail(new BadRequest("Invalid request"));

        await vocationalDeleteService.Delete(x => x.SubjectId == id, false);
        await generalDeleteService.Delete(x => x.SubjectId == id, false);

        var deleteResult = await deleteTeacherSubjectService.Delete(x => x.SubjectId == id, false);
        if (deleteResult.IsFailed)
            return deleteResult;

        return await deleteService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteTranslation(int subjectId, string languageCode)
    {
        if (subjectId < 1 || string.IsNullOrWhiteSpace(languageCode))
            return Task.FromResult(Result.Fail(new BadRequest("Invalid request")));

        return deleteTranslationService.Delete(x =>
            x.SubjectId == subjectId && x.LanguageCode == languageCode
        );
    }
}
