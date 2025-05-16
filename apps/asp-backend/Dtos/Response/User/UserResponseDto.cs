namespace EtsZemun.Dtos.Response.User;

public class UserResponseDto
{
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public bool EmailConfirmed { get; set; }
}
