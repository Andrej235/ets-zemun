using FluentResults;

namespace EtsZemun.Services.Model.QualificationService;

public partial class QualificationService : IQualificationService
{
    public Task<Result> Delete(int id)
    {
        return deleteQualificationService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteTranslation(int qualificationId, string languageCode)
    {
        return deleteQualificationTranslationService.Delete(x =>
            x.LanguageCode == languageCode && x.QualificationId == qualificationId
        );
    }
}
