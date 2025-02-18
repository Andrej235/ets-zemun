namespace EtsZemun.Models;

public class QualificationTranslation
{
    public int QualificationId { get; set; }
    public string LanguageCode { get; set; } = null!;

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
