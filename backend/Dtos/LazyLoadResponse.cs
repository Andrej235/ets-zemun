namespace EtsZemun.Dtos;

public class LazyLoadResponse<T>
{
    public IEnumerable<T> Items { get; set; } = [];
    public int LoadedCount { get; set; }
    public int TotalCount { get; set; }
    public string? NextCursor { get; set; }
}
