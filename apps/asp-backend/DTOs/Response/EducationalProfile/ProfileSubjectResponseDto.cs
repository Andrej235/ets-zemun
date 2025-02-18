using EtsZemun.DTOs.Response.Subject;

namespace EtsZemun.DTOs.Response.EducationalProfile;

public class ProfileSubjectResponseDto
{
    public int SubjectId { get; set; }
    public SimpleSubjectResponseDto Subject { get; set; } = null!;

    public int PerWeek { get; set; }
}
