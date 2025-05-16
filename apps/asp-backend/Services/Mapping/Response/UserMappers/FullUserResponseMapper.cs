using EtsZemun.Dtos.Response.Auth;
using Microsoft.AspNetCore.Identity;

namespace EtsZemun.Services.Mapping.Response.UserMappers;

public class FullUserResponseMapper : IResponseMapper<IdentityUser, FullUserResponseDto>
{
    public FullUserResponseDto Map(IdentityUser from) =>
        new()
        {
            Id = from.Id,
            Username = from.UserName ?? "",
            Email = from.Email ?? "",
            EmailConfirmed = from.EmailConfirmed,
        };
}
