namespace EtsZemun.Dtos.Response.Auth;

public class FullUserResponseDto
{
    public string Id { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool EmailConfirmed { get; set; }
    public IEnumerable<string> Role { get; set; } = null!;
}
