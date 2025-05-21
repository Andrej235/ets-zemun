using System.Security.Claims;
using System.Web;
using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.ModelServices.UserService;

public partial class UserService
{
    public async Task<Result> ConfirmEmail(ClaimsPrincipal userClaim, string token)
    {
        var user = await userManager.GetUserAsync(userClaim);
        if (user is null)
            return Result.Fail(new Unauthorized());

        var result = await userManager.ConfirmEmailAsync(user, token);
        if (!result.Succeeded)
            return Result.Fail(
                new BadRequest(string.Join(", ", result.Errors.Select(x => x.Description)))
            );

        return Result.Ok();
    }

    public async Task<Result> ResendConfirmationEmail(ClaimsPrincipal userClaim)
    {
        var user = await userManager.GetUserAsync(userClaim);
        if (user is null)
            return Result.Fail(new Unauthorized());

        if (user.Email is null)
            return Result.Fail(new BadRequest("Email not found"));

        if (user.EmailConfirmed)
            return Result.Fail(new BadRequest("Email already confirmed"));

        var emailToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await emailSender.SendConfirmationLinkAsync(
            user,
            user.Email,
            $"{configuration["FrontendUrl"]}/confirm-email?token={HttpUtility.UrlEncode(emailToken)}"
        );

        return Result.Ok();
    }
}
