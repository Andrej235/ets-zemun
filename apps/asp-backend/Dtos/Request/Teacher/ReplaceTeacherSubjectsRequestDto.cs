namespace EtsZemun.Dtos.Request.Teacher;

public class ReplaceTeacherSubjectsRequestDto
{
    public int TeacherId { get; set; }
    public List<int> SubjectIds { get; set; } = null!;
}
