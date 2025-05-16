namespace EtsZemun.Dtos.Request.Award;

public class UpdateAwardRequestDto
{
    public int Id { get; set; }
    public string Image { get; set; } = null!;
    public DateOnly DayOfAward { get; set; }
    public string? ExternalLink { get; set; }
}
