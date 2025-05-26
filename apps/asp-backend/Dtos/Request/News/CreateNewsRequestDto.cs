namespace EtsZemun.Dtos.Request.News;

public class CreateNewsRequestDto
{
    public string PreviewImage { get; set; } = null!;
    public DateOnly Date { get; set; }
    public IEnumerable<CreateNewsTranslationRequestDto> Translations { get; set; } = null!;
}
