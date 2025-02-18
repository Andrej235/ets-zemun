using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.QualificationMappers;

public class CreateQualificationTranslationRequestMapper
    : IRequestMapper<CreateQualificationTranslationRequestDto, QualificationTranslation>
{
    public QualificationTranslation Map(CreateQualificationTranslationRequestDto from) =>
        new()
        {
            QualificationId = from.QualificationId,
            LanguageId = from.LanguageId,
            Name = from.Name,
            Description = from.Description,
        };
}
