namespace EtsZemun.Dtos.Request.Exam;

public class UpdateExamRequestDto
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public string Cabinet { get; set; } = null!;
    public int SubjectId { get; set; }
    public IEnumerable<int> Commission { get; set; } = null!;
}
