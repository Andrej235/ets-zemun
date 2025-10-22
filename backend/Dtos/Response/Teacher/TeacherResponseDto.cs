using EtsZemun.Dtos.Response.Qualification;
using EtsZemun.Dtos.Response.Subject;

namespace EtsZemun.Dtos.Response.Teacher;

public class TeacherResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Bio { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;
    public string? StartOfOpenOfficeHoursFirstShift { get; set; }
    public string? StartOfOpenOfficeHoursSecondShift { get; set; }
    public IEnumerable<QualificationResponseDto> Qualifications { get; set; } = [];
    public IEnumerable<SimpleSubjectResponseDto> Subjects { get; set; } = [];
}
