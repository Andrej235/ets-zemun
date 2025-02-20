namespace EtsZemun.DTOs.Request.News;

public class CreateNewsTranslationRequestDto
{
    public int NewsId { get; set; }
    public string LanguageCode { get; set; } = null!;

    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string Markup { get; set; } = null!;
}
