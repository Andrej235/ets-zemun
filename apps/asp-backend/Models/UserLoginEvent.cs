namespace EtsZemun.Models;

public class UserLoginEvent
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = null!;
    public DateTime LoginTime { get; set; }
    public string IpAddress { get; set; } = null!;
    public string UserAgent { get; set; } = null!;

    public User User { get; set; } = null!;
}
