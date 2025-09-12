using EtsZemun.Dtos.Request.News;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.NewsMappers;

public class CreateNewsRequestMapper(
    IRequestMapper<CreateNewsTranslationRequestDto, NewsTranslation> translationMapper
) : IRequestMapper<CreateNewsRequestDto, News>
{
    public News Map(CreateNewsRequestDto from) =>
        new()
        {
            Date = from.Date,
            PreviewImage = from.PreviewImage,
            Translations = [.. from.Translations.Select(translationMapper.Map)],
        };
}
