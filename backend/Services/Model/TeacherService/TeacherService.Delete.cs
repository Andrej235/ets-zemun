using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService
{
    public async Task<Result> Delete(int id)
    {
        await qualificationDeleteService.Delete(x => x.TeacherId == id, false);
        return await deleteService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteTranslation(int teacherId, string languageCode)
    {
        return deleteTranslationService.Delete(x =>
            x.TeacherId == teacherId && x.LanguageCode == languageCode
        );
    }
}
