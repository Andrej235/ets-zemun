namespace EtsZemun.Dtos.Request.Caption;

public class CreateCaptionRequestDto
{
    public string AdminDescription { get; set; } = null!;
    public IEnumerable<CaptionTranslationRequestDto> Translations { get; set; } = null!;
}
