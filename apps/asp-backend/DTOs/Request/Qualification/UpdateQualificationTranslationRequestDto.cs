namespace EtsZemun.DTOs.Request.Qualification;

public class UpdateQualificationTranslationRequestDto
{
    public int QualificationId { get; set; }
    public int LanguageId { get; set; }

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
