namespace EtsZemun.Dtos.Request.Exam;

public class CreateExamRequestDto
{
    public string Subject { get; set; } = null!;
    public string Commission { get; set; } = null!;
    public string Date { get; set; } = null!;
    public string StartTime { get; set; } = null!;
    public string Cabinet { get; set; } = null!;
}
