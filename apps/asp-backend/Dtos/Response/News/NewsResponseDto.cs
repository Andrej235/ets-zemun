namespace EtsZemun.Dtos.Response.News;

public class NewsResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Markup { get; set; } = null!;
    public bool IsApproved { get; set; }
}
