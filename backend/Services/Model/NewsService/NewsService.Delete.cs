using FluentResults;

namespace EtsZemun.Services.Model.NewsService;

public partial class NewsService
{
    public Task<Result> Delete(int id)
    {
        return deleteService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteTranslation(int id, string languageCode)
    {
        return deleteTranslationService.Delete(x =>
            x.LanguageCode == languageCode && x.NewsId == id
        );
    }
}
