namespace EtsZemun.DTOs.Request.Award;

public class CreateAwardRequestDto
{
    public string Image { get; set; } = null!;
    public DateOnly DayOfAward { get; set; }
    public string? ExternalLink { get; set; }
    public CreateAwardTranslationRequestDto Translation { get; set; } = null!;
}
