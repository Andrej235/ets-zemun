namespace EtsZemun.Models;

public class NewsTranslation
{
    public int NewsId { get; set; }
    public string LanguageCode { get; set; } = null!;

    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Markup { get; set; } = null!;
}
