using EtsZemun.DTOs.Request.Award;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.AwardMappers;

public class CreateAwardTranslationRequestMapper
    : IRequestMapper<CreateAwardTranslationRequestDto, AwardTranslation>
{
    public AwardTranslation Map(CreateAwardTranslationRequestDto from) =>
        new()
        {
            AwardId = from.AwardId,
            LanguageId = from.LanguageId,
            Competition = from.Competition,
            Description = from.Description,
            Student = from.Student,
            Title = from.Title,
        };
}
