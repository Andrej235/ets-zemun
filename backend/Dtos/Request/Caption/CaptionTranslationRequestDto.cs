namespace EtsZemun.Dtos.Request.Caption;

public class CaptionTranslationRequestDto
{
    public int CaptionId { get; set; }
    public string LanguageCode { get; set; } = null!;
    public string Title { get; set; } = null!;
}
