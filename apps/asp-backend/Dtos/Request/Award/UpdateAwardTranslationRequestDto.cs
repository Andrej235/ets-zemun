namespace EtsZemun.Dtos.Request.Award;

public class UpdateAwardTranslationRequestDto
{
    public int AwardId { get; set; }
    public string LanguageCode { get; set; } = null!;

    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Competition { get; set; } = null!;
    public string Student { get; set; } = null!;
}
