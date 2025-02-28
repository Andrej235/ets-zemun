namespace EtsZemun.Models;

public class EducationalProfile
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<EducationalProfileGeneralSubject> GeneralSubjects { get; set; } = [];
    public ICollection<EducationalProfileVocationalSubject> VocationalSubjects { get; set; } = [];
}
