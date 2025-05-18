namespace EtsZemun.Dtos.Response.Admin;

public class AdminOverviewResponseDto
{
    public int NewsCount { get; set; }
    public int UnapprovedNewsCount { get; set; }

    public int LanguagesCount { get; set; }
    public IEnumerable<string> Languages { get; set; } = null!;

    public int SubjectsCount { get; set; }

    public int ProfilesCount { get; set; }

    public int TeachersCount { get; set; }

    public int AwardsCount { get; set; }
}
