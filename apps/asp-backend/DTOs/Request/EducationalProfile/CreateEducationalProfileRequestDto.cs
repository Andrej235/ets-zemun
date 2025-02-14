namespace EtsZemun.DTOs.Request.EducationalProfile;

public class CreateEducationalProfileRequestDto
{
    public IEnumerable<CreateProfileSubjectRequestDto> GeneralSubjects { get; set; } = [];
    public IEnumerable<CreateProfileSubjectRequestDto> VocationalSubjects { get; set; } = [];
}
