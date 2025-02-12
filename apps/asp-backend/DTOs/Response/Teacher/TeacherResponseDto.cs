using EtsZemun.DTOs.Response.Qualification;
using EtsZemun.DTOs.Response.Subject;

namespace EtsZemun.DTOs.Response.Teacher;

public class TeacherResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Bio { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;
    public TimeOnly? StartOfOpenOfficeHoursFirstShift { get; set; }
    public TimeOnly? StartOfOpenOfficeHoursSecondShift { get; set; }
    public ICollection<QualificationResponseDto> Qualifications { get; set; } = [];
    public ICollection<SimpleSubjectResponseDto> Subjects { get; set; } = [];
}
