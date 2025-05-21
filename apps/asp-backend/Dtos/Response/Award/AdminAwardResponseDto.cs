using EtsZemun.Dtos.Response.Translations;

namespace EtsZemun.Dtos.Response.Award;

public class AdminAwardResponseDto
{
    public int Id { get; set; }
    public string Image { get; set; } = null!;
    public DateOnly DayOfAward { get; set; }
    public string? ExternalLink { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string Competition { get; set; } = null!;
    public string Student { get; set; } = null!;
    public IEnumerable<string> Translations { get; set; } = [];
}
