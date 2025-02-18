namespace EtsZemun.Models;

public class QualificationTranslation
{
    public int QualificationId { get; set; }
    public int LanguageId { get; set; }

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
