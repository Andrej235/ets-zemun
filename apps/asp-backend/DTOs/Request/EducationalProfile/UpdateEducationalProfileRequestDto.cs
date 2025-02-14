namespace EtsZemun.DTOs.Request.EducationalProfile;

public class UpdateEducationalProfileRequestDto
{
    public int Id { get; set; }

    public IEnumerable<CreateGeneralSubjectRequestDto> GeneralSubjects { get; set; } = [];
    public IEnumerable<CreateVocationalSubjectRequestDto> VocationalSubjects { get; set; } = [];
}
