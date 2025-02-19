using Microsoft.AspNetCore.Identity;

namespace EtsZemun.Models;

public class User : IdentityUser
{
    public string Role { get; set; } = "User";
}
