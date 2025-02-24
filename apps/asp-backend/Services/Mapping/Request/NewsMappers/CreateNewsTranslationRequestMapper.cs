using EtsZemun.DTOs.Request.News;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.NewsMappers;

public class CreateNewsTranslationRequestMapper
    : IRequestMapper<CreateNewsTranslationRequestDto, NewsTranslation>
{
    public NewsTranslation Map(CreateNewsTranslationRequestDto from) =>
        new()
        {
            NewsId = from.NewsId,
            LanguageCode = from.LanguageCode,
            Title = from.Title,
            Description = from.Description,
            Markup = from.Markup,
        };
}
