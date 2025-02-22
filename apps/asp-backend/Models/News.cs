namespace EtsZemun.Models;

public class News
{
    public int Id { get; set; }
    public string PreviewImage { get; set; } = null!;
    public DateOnly Date { get; set; }
    public bool IsApproved { get; set; }

    public ICollection<NewsTranslation> Translations { get; set; } = [];
    public ICollection<NewsImage> Images { get; set; } = [];
}
