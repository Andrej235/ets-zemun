using EtsZemun.Models;

namespace EtsZemun.DTOs.Response.News;

public class NewsResponseDto
{
    public int Id { get; set; }
    public string Markup { get; set; } = null!;
    public LazyLoadResponse<NewsImage> Images { get; set; } = null!;
}
