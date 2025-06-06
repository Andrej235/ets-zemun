namespace EtsZemun.Models;

public class Exam
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public string Cabinet { get; set; } = null!;

    public int SubjectId { get; set; }
    public Subject Subject { get; set; } = null!;

    public ICollection<ExamCommissionMember> Commission { get; set; } = [];
}
