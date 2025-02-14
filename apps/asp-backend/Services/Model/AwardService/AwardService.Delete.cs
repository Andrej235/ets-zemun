using FluentResults;

namespace EtsZemun.Services.Model.AwardService;

public partial class AwardService
{
    public Task<Result> Delete(int id)
    {
        return deleteService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteTranslation(int awardId, int languageId)
    {
        return deleteTranslationService.Delete(x =>
            x.AwardId == awardId && x.LanguageId == languageId
        );
    }
}
