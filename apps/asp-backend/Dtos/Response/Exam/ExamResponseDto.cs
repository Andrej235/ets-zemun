using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Dtos.Response.Teacher;

namespace EtsZemun.Dtos.Response.Exam;

public class ExamResponseDto
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public string Cabinet { get; set; } = null!;
    public SimpleSubjectResponseDto Subject { get; set; } = null!;
    public IEnumerable<SimpleTeacherResponseDto> Commission { get; set; } = [];
}
