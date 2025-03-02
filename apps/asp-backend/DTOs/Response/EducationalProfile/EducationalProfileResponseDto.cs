namespace EtsZemun.DTOs.Response.EducationalProfile;

public class EducationalProfileResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public IEnumerable<ProfileSubjectResponseDto> GeneralSubjects { get; set; } = [];
    public IEnumerable<ProfileSubjectResponseDto> VocationalSubjects { get; set; } = [];
}
