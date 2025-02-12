namespace EtsZemun.Models;

public class EducationalProfileVocationalSubject
{
    public int EducationalProfileId { get; set; }
    public EducationalProfile Profile { get; set; } = null!;

    public int SubjectId { get; set; }
    public Subject Subject { get; set; } = null!;

    public int PerWeek { get; set; }
}
