namespace EtsZemun.Models;

public class Subject
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public ICollection<Teacher> Teachers { get; set; } = [];
}
