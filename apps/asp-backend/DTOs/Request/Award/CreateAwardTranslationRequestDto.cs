namespace EtsZemun.DTOs.Request.Award;

public class CreateAwardTranslationRequestDto
{
    public int AwardId { get; set; }
    public int LanguageId { get; set; }

    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Competition { get; set; } = null!;
    public string Student { get; set; } = null!;
}
