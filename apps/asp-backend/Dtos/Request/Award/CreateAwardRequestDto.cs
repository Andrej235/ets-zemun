namespace EtsZemun.Dtos.Request.Award;

public class CreateAwardRequestDto
{
    public string Image { get; set; } = null!;
    public DateOnly DayOfAward { get; set; }
    public string? ExternalLink { get; set; }
    public IEnumerable<CreateAwardTranslationRequestDto> Translations { get; set; } = null!;
}
