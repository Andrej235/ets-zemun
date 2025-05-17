namespace EtsZemun.Dtos.Response.Subject;

public class AdminSubjectResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public int TeachersCount { get; set; }
    public IEnumerable<string> Translations { get; set; } = [];
}
