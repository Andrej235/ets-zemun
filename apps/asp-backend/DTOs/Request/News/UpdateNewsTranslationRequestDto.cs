namespace EtsZemun.DTOs.Request.News;

public class UpdateNewsTranslationRequestDto
{
    public int Id { get; set; }
    public string LanguageCode { get; set; } = null!;

    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Markup { get; set; } = null!;
}
