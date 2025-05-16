namespace EtsZemun.Dtos.Request.News;

public class UpdateNewsRequestDto
{
    public int Id { get; set; }
    public string PreviewImage { get; set; } = null!;
    public DateOnly Date { get; set; }
    public List<CreateNewsImageRequestDto> Images { get; set; } = null!;
}
