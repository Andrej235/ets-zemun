namespace EtsZemun.DTOs.Request.Subject;

public class UpdateSubjectTranslationRequestDto
{
    public int SubjectId { get; set; }
    public string LanguageCode { get; set; } = null!;

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
