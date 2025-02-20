namespace EtsZemun.Models;

public class News
{
    public int Id { get; set; }
    public string PreviewImage { get; set; } = null!;
    public DateTime Date { get; set; }

    public IEnumerable<NewsTranslation> Translations { get; set; } = [];
    public IEnumerable<NewsImage> Images { get; set; } = [];
}
