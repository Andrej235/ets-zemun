namespace EtsZemun.Dtos.Response.Admin;

public class AdminUserLoginOverviewResponseDto
{
    public string Name { get; set; } = null!;
    public string Role { get; set; } = null!;
    public DateTime LoginTime { get; set; }
}
