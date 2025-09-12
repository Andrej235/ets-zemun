namespace EtsZemun.Dtos.Response.News;

public class AdminNewsPreviewResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string PreviewImage { get; set; } = null!;
    public DateOnly Date { get; set; }
    public bool IsApproved { get; set; }
    public IEnumerable<string> Translations { get; set; } = null!;
}
