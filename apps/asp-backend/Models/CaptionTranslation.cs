namespace EtsZemun.Models;

public class CaptionTranslation
{
    public int CaptionId { get; set; }
    public string LanguageCode { get; set; } = null!;
    public string Title { get; set; } = null!;
}
