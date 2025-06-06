namespace EtsZemun.Dtos.Response.Exam;

public class ExamResponseDto
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public string Cabinet { get; set; } = null!;
    public int SubjectId { get; set; }
    public string Subject { get; set; } = null!;
    public IEnumerable<string> Commission { get; set; } = [];
}
