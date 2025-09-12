namespace EtsZemun.Dtos.Response.Captions;

public class AdminCaptionResponseDto
{
    public int Id { get; set; }
    public string AdminDescription { get; set; } = null!;
    public IEnumerable<CaptionTranslationResponseDto> Translations { get; set; } = null!;
}
