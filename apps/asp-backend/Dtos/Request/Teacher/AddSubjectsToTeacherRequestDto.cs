namespace EtsZemun.Dtos.Request.Teacher;

public class AddSubjectsToTeacherRequestDto
{
    public int TeacherId { get; set; }
    public List<int> SubjectIds { get; set; } = null!;
}
