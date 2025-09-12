namespace EtsZemun.Dtos.Request.EducationalProfile;

public class UpdateProfileSubjectRequestDto
{
    public int ProfileId { get; set; }
    public int SubjectId { get; set; }
    public AddSubjectRequestDto.SubjectType CurrentType { get; set; }

    public int NewPerWeek { get; set; }
    public int NewYear { get; set; }
    public AddSubjectRequestDto.SubjectType NewType { get; set; }
}
