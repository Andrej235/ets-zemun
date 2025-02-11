namespace EtsZemun.Models;

public class SubjectTranslation
{
    public int SubjectId { get; set; }
    public int LanguageId { get; set; }

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
