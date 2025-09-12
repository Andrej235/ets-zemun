using EtsZemun.Dtos.Request.Award;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.AwardMappers;

public class CreateAwardTranslationRequestMapper
    : IRequestMapper<CreateAwardTranslationRequestDto, AwardTranslation>
{
    public AwardTranslation Map(CreateAwardTranslationRequestDto from) =>
        new()
        {
            AwardId = from.AwardId,
            LanguageCode = from.LanguageCode,
            Competition = from.Competition,
            Description = from.Description,
            Student = from.Student,
            Title = from.Title,
        };
}
