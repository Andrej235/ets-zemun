namespace EtsZemun.DTOs.Request.News;

public class CreateNewsRequestDto
{
    public string PreviewImage { get; set; } = null!;
    public DateOnly Date { get; set; }
    public CreateNewsTranslationRequestDto Translation { get; set; } = null!;
    public List<string> Images { get; set; } = null!;
}
