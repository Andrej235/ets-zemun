namespace EtsZemun.Models;

public class ExamCommissionMember
{
    public int ExamId { get; set; }
    public Exam Exam { get; set; } = null!;

    public int TeacherId { get; set; }
    public Teacher Teacher { get; set; } = null!;
}
