namespace EtsZemun.Dtos.Response.Captions;

public class CaptionTranslationResponseDto
{
    public int CaptionId { get; set; }
    public string LanguageCode { get; set; } = null!;
    public string Title { get; set; } = null!;
}
