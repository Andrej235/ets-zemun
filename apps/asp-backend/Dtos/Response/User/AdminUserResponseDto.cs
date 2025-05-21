namespace EtsZemun.Dtos.Response.User;

public class AdminUserResponseDto
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public bool Verified { get; set; }
    public DateTime JoinedAt { get; set; }
}
