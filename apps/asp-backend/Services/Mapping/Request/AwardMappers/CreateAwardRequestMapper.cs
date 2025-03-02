using EtsZemun.DTOs.Request.Award;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.AwardMappers;

public class CreateAwardRequestMapper(
    IRequestMapper<CreateAwardTranslationRequestDto, AwardTranslation> translationMapper
) : IRequestMapper<CreateAwardRequestDto, Award>
{
    private readonly IRequestMapper<
        CreateAwardTranslationRequestDto,
        AwardTranslation
    > translationMapper = translationMapper;

    public Award Map(CreateAwardRequestDto from) =>
        new()
        {
            Image = from.Image,
            ExternalLink = from.ExternalLink,
            DayOfAward = from.DayOfAward,
            Translations = [translationMapper.Map(from.Translation)],
        };
}
