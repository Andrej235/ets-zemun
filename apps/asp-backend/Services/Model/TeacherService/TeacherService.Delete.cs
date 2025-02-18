using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService
{
    public Task<Result> Delete(int id)
    {
        return deleteService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteTranslation(int teacherId, int languageId)
    {
        return deleteTranslationService.Delete(x =>
            x.TeacherId == teacherId && x.LanguageId == languageId
        );
    }
}
