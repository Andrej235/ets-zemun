namespace EtsZemun.DTOs.Request.EducationalProfile;

public class CreateEducationalProfileRequestDto
{
    public string Name { get; set; } = null!;
    public IEnumerable<CreateProfileSubjectRequestDto> GeneralSubjects { get; set; } = [];
    public IEnumerable<CreateProfileSubjectRequestDto> VocationalSubjects { get; set; } = [];
}
