namespace EtsZemun.DTOs.Request.News;

public class UpdateNewsRequestDto
{
    public int Id { get; set; }
    public string PreviewImage { get; set; } = null!;
    public DateTime Date { get; set; }
    public List<string> Images { get; set; } = null!;
}
