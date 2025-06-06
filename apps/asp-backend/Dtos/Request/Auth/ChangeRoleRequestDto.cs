using System.ComponentModel.DataAnnotations;

namespace EtsZemun.Dtos.Request.Auth;

public class ChangeRoleRequestDto
{
    [Required]
    public string UserId { get; set; } = null!;

    [Required]
    public string Role { get; set; } = null!;
}
