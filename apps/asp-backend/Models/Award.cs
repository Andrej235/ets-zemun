namespace EtsZemun.Models;

public class Award
{
    public int Id { get; set; }
    public string Image { get; set; } = null!;
    public ICollection<AwardTranslation> Translations { get; set; } = [];
    public DateOnly DayOfAward { get; set; }
    public string? ExternalLink { get; set; }

    public int? TeacherId { get; set; }
    public Teacher? Teacher { get; set; } = null!;
}
