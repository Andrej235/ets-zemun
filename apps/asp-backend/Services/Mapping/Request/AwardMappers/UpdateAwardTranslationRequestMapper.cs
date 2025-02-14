using EtsZemun.DTOs.Request.Award;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.AwardMappers;

public class UpdateAwardTranslationRequestMapper
    : IRequestMapper<UpdateAwardTranslationRequestDto, AwardTranslation>
{
    public AwardTranslation Map(UpdateAwardTranslationRequestDto from) =>
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
