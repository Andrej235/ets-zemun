namespace EtsZemun.Models;

public class Caption
{
    public int Id { get; set; }
    public string AdminDescription { get; set; } = null!;
    public ICollection<CaptionTranslation> Translations { get; set; } = null!;
}
