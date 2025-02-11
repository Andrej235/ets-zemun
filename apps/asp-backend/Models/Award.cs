namespace EtsZemun.Models;

public class Award
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Competition { get; set; } = null!;
    public string ImagePath { get; set; } = null!;
    public string Student { get; set; } = null!;
    public DateOnly DayOfAward { get; set; }
    public string? ExternalLink { get; set; }

    public int MentorId { get; set; }
    public Teacher Mentor { get; set; } = null!;
}
