namespace EtsZemun.DTOs.Response.EducationalProfile;

public class EducationalProfileResponseDto
{
    public int Id { get; set; }

    public IEnumerable<ProfileSubjectResponseDto> GeneralSubjects { get; set; } = [];
    public IEnumerable<ProfileSubjectResponseDto> VocationalSubjects { get; set; } = [];
}
