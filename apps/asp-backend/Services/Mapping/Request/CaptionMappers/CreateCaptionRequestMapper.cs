using EtsZemun.Dtos.Request.Caption;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.CaptionMappers;

public class CreateCaptionRequestMapper : IRequestMapper<CreateCaptionRequestDto, Caption>
{
    public Caption Map(CreateCaptionRequestDto from)
    {
        return new()
        {
            AdminDescription = from.AdminDescription,
            Translations =
            [
                .. from.Translations.Select(y => new CaptionTranslation()
                {
                    LanguageCode = y.LanguageCode,
                    Title = y.Title,
                }),
            ],
        };
    }
}
