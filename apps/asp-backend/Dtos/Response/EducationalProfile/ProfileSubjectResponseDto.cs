using EtsZemun.Dtos.Response.Subject;

namespace EtsZemun.Dtos.Response.EducationalProfile;

public class ProfileSubjectResponseDto
{
    public int SubjectId { get; set; }
    public SimpleSubjectResponseDto Subject { get; set; } = null!;

    public int PerWeek { get; set; }
    public int Year { get; set; }
}
