using EtsZemun.Models;

namespace EtsZemun.Dtos.Response.News;

public class NewsResponseDto
{
    public int Id { get; set; }
    public string Markup { get; set; } = null!;
    public LazyLoadResponse<NewsImageResponseDto> Images { get; set; } = null!;
    public bool IsApproved { get; set; }
}
