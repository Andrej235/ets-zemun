namespace EtsZemun.Models;

public class Subject
{
    public int Id { get; set; }
    public ICollection<SubjectTranslation> Translations { get; set; } = [];

    public ICollection<Teacher> Teachers { get; set; } = [];
}
