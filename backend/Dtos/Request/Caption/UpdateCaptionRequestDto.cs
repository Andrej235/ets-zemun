namespace EtsZemun.Dtos.Request.Caption;

public class UpdateCaptionRequestDto
{
    public int Id { get; set; }
    public string AdminDescription { get; set; } = null!;
    public IEnumerable<CaptionTranslationRequestDto> Translations { get; set; } = null!;
}
