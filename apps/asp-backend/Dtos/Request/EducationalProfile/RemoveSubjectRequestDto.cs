namespace EtsZemun.Dtos.Request.EducationalProfile;

public class RemoveSubjectRequestDto
{
    public int ProfileId { get; set; }
    public int SubjectId { get; set; }
    public AddSubjectRequestDto.SubjectType Type { get; set; }
}
