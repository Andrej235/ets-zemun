namespace EtsZemun.Dtos.Response.Exam;

public class ExamResponseDto
{
    public int Id { get; set; }
    public string Subject { get; set; } = null!;
    public string Commission { get; set; } = null!;
    public string Date { get; set; } = null!;
    public string StartTime { get; set; } = null!;
    public string Cabinet { get; set; } = null!;
}
