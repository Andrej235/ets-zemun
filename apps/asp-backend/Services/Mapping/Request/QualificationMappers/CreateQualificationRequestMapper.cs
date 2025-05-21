using EtsZemun.Dtos.Request.Qualification;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.QualificationMappers;

public class CreateQualificationRequestMapper(
    IRequestMapper<
        CreateQualificationTranslationRequestDto,
        QualificationTranslation
    > translationMapper
) : IRequestMapper<CreateQualificationRequestDto, Qualification>
{
    private readonly IRequestMapper<
        CreateQualificationTranslationRequestDto,
        QualificationTranslation
    > translationMapper = translationMapper;

    public Qualification Map(CreateQualificationRequestDto from) =>
        new()
        {
            DateObtained = DateTime.SpecifyKind(from.DateObtained, DateTimeKind.Utc),
            TeacherId = from.TeacherId,
            Translations = [.. from.Translations.Select(translationMapper.Map)],
        };
}
