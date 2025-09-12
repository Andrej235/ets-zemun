namespace EtsZemun.Dtos.Response.Award;

public class AdminAwardTranslationResponseDto
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Competition { get; set; } = null!;
    public string Student { get; set; } = null!;
}
