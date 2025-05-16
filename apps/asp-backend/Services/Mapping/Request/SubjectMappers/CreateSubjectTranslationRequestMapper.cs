using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.SubjectMappers;

public class CreateSubjectTranslationRequestMapper
    : IRequestMapper<CreateSubjectTranslationRequestDto, SubjectTranslation>
{
    public SubjectTranslation Map(CreateSubjectTranslationRequestDto from) =>
        new()
        {
            Name = from.Name,
            Description = from.Description,
            LanguageCode = from.LanguageCode,
            SubjectId = from.SubjectId,
        };
}
