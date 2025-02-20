using EtsZemun.DTOs.Request.News;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.NewsMappers;

public class CreateNewsRequestMapper(
    IRequestMapper<CreateNewsTranslationRequestDto, NewsTranslation> translationMapper
) : IRequestMapper<CreateNewsRequestDto, News>
{
    private readonly IRequestMapper<
        CreateNewsTranslationRequestDto,
        NewsTranslation
    > translationMapper = translationMapper;

    public News Map(CreateNewsRequestDto from) =>
        new()
        {
            Date = from.Date,
            PreviewImage = from.PreviewImage,
            Translations = [translationMapper.Map(from.Translation)],
            Images = [],
        };
}
