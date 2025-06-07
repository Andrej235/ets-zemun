using EtsZemun.Dtos.Response.Captions;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.CaptionService;

public partial class CaptionService
{
    public Task<Result<IEnumerable<AdminCaptionResponseDto>>> AdminGetAll()
    {
        return readRangeSelectedService.Get(
            x => new AdminCaptionResponseDto()
            {
                Id = x.Id,
                AdminDescription = x.AdminDescription,
                Translations = x.Translations.Select(y => new CaptionTranslationResponseDto()
                {
                    CaptionId = y.CaptionId,
                    LanguageCode = y.LanguageCode,
                    Title = y.Title,
                }),
            },
            null,
            0,
            -1,
            q => q.OrderBy(x => x.Id)
        );
    }

    public Task<Result<AdminCaptionResponseDto>> AdminGetSingle(int id)
    {
        return readSingleSelectedService.Get(
            x => new AdminCaptionResponseDto()
            {
                Id = x.Id,
                AdminDescription = x.AdminDescription,
                Translations = x.Translations.Select(y => new CaptionTranslationResponseDto()
                {
                    CaptionId = y.CaptionId,
                    LanguageCode = y.LanguageCode,
                    Title = y.Title,
                }),
            },
            x => x.Id == id
        );
    }

    public Task<Result<CaptionResponseDto>> GetSingle(int id, string languageCode)
    {
        return readSingleSelectedService.Get(
            x => new CaptionResponseDto()
            {
                Title = x.Translations.FirstOrDefault(x => x.LanguageCode == languageCode)!.Title,
            },
            x => x.Id == id
        );
    }
}
