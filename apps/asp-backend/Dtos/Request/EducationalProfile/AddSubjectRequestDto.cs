namespace EtsZemun.Dtos.Request.EducationalProfile;

public class AddSubjectRequestDto
{
    public enum SubjectType
    {
        Vocational = 0,
        General = 1,
    }

    public int ProfileId { get; set; }
    public int SubjectId { get; set; }
    public int PerWeek { get; set; }
    public int Year { get; set; }
    public SubjectType Type { get; set; }
}
