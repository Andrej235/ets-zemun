using System.Security.Claims;
using EtsZemun.Dtos.Request.User;
using EtsZemun.Dtos.Response.User;
using FluentResults;

namespace EtsZemun.Services.ModelServices.UserService;

public interface IUserService
{
    Task<Result<UserResponseDto>> GetRole(ClaimsPrincipal userClaim);
    Task<Result> Register(RegisterRequestDto request);

    Task<Result<IEnumerable<AdminUserResponseDto>>> GetAll(int offset, int limit, string? search);
    Task<Result> Delete(string id);

    Task<Result> SetAsUser(string id);
    Task<Result> SetAsMod(string id);
    Task<Result> SetAsAdmin(string id);

    Task<Result> ResendConfirmationEmail(ClaimsPrincipal userClaim);
    Task<Result> ConfirmEmail(ClaimsPrincipal userClaim, string token);

    Task<Result> SendResetPasswordEmail(SendResetPasswordEmailRequestDto request);
    Task<Result> ResetPassword(ResetPasswordRequestDto request);

    Task<Result> SaveLoginEvent(string userName);
}
