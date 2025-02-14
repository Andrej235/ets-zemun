namespace EtsZemun.DTOs.Request.EducationalProfile;

public class CreateEducationalProfileRequestDto
{
    public IEnumerable<CreateGeneralSubjectRequestDto> GeneralSubjects { get; set; } = [];
    public IEnumerable<CreateVocationalSubjectRequestDto> VocationalSubjects { get; set; } = [];
}
