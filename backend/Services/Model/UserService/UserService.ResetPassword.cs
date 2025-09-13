using EtsZemun.Dtos.Request.User;
using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.ModelServices.UserService;

public partial class UserService
{
    public async Task<Result> SendResetPasswordEmail(SendResetPasswordEmailRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
            return Result.Fail(new BadRequest("Email nije pronađen"));

        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
            return Result.Fail(new NotFound("Korisnik nije pronađen"));

        var token = await userManager.GeneratePasswordResetTokenAsync(user);

        await emailSender.SendPasswordResetLinkAsync(
            user,
            request.Email,
            $"{configuration["FrontendUrl"]}/reset-password?token={token}&email={request.Email}"
        );
        return Result.Ok();
    }

    public async Task<Result> ResetPassword(ResetPasswordRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
            return Result.Fail(new BadRequest("Email je obavezan"));

        if (string.IsNullOrWhiteSpace(request.Token))
            return Result.Fail(new BadRequest("Token nije validan"));

        if (string.IsNullOrWhiteSpace(request.NewPassword))
            return Result.Fail(new BadRequest("Nova lozinka je obavezna"));

        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
            return Result.Fail(new NotFound("Korisnik nije pronađen"));

        var result = await userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);

        if (!result.Succeeded)
            return Result.Fail(
                new BadRequest(string.Join(", ", result.Errors.Select(x => x.Description)))
            );

        return Result.Ok();
    }
}
