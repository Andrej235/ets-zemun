using System.Security.Claims;
using EtsZemun.Dtos.Request.User;
using EtsZemun.Dtos.Response.User;
using EtsZemun.Errors;
using EtsZemun.Models;
using EtsZemun.Utilities;
using FluentResults;

namespace EtsZemun.Services.ModelServices.UserService;

public partial class UserService
{
    public async Task<Result<UserResponseDto>> GetRole(ClaimsPrincipal userClaim)
    {
        var user = await userManager.GetUserAsync(userClaim);
        if (user is null)
            return Result.Fail(new Unauthorized());

        var roles = await userManager.GetRolesAsync(user);
        if (roles.Count == 0)
            return Result.Fail(new Unauthorized());

        return Result.Ok(
            new UserResponseDto()
            {
                Username = user.UserName ?? "Unknown",
                Email = user.Email ?? "Unknown",
                Role = roles[0],
                EmailConfirmed = user.EmailConfirmed,
            }
        );
    }

    public async Task<Result> Register(RegisterRequestDto request)
    {
        var user = new User { Email = request.Email, UserName = request.Username };
        var creationResult = await userManager.CreateAsync(user, request.Password);

        if (!creationResult.Succeeded)
            return Result.Fail(creationResult.Errors.Select(x => new BadRequest(x.Description)));

        var roleResult = await userManager.AddToRoleAsync(user, Roles.User);
        if (!roleResult.Succeeded)
            return Result.Fail(roleResult.Errors.Select(x => new BadRequest(x.Description)));

        var emailToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await emailSender.SendConfirmationLinkAsync(
            user,
            request.Email,
            $"{configuration["FrontendUrl"]}/confirm-email?token={emailToken}"
        );

        return Result.Ok();
    }

    public async Task<Result> SaveLoginEvent(string userName)
    {
        var user = await userManager.FindByNameAsync(userName);
        if (user is null)
            return Result.Fail(new NotFound("User not found"));

        var loginHistory = new UserLoginEvent
        {
            UserId = user.Id,
            LoginTime = DateTime.UtcNow,
            IpAddress =
                httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.ToString()
                ?? "Unknown",
            UserAgent =
                httpContextAccessor.HttpContext?.Request != null
                && httpContextAccessor.HttpContext.Request.Headers.TryGetValue(
                    "User-Agent",
                    out Microsoft.Extensions.Primitives.StringValues value
                )
                    ? value.ToString()
                    : "Unknown",
        };

        var result = await createLoginEventService.Add(loginHistory);
        if (result.IsFailed)
            return Result.Fail(result.Errors);

        return Result.Ok();
    }
}
