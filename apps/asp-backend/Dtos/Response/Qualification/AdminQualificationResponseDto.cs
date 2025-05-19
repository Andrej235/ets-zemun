using EtsZemun.Dtos.Response.Translations;

namespace EtsZemun.Dtos.Response.Qualification;

public class AdminQualificationResponseDto
{
    public int Id { get; set; }
    public int TeacherId { get; set; }
    public DateTime DateObtained { get; set; }
    public IEnumerable<
        TranslationWrapper<AdminQualificationTranslationResponseDto>
    > Translations { get; set; } = [];
}
