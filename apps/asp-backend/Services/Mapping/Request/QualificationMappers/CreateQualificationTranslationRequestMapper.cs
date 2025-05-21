using EtsZemun.Dtos.Request.Qualification;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.QualificationMappers;

public class CreateQualificationTranslationRequestMapper
    : IRequestMapper<CreateQualificationTranslationRequestDto, QualificationTranslation>
{
    public QualificationTranslation Map(CreateQualificationTranslationRequestDto from) =>
        new()
        {
            QualificationId = from.QualificationId,
            LanguageCode = from.LanguageCode,
            Name = from.Name,
            Description = from.Description,
        };
}
