namespace EtsZemun.Dtos.Response.Qualification;

public class QualificationResponseDto
{
    public int Id { get; set; }
    public int TeacherId { get; set; }
    public DateTime DateObtained { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
