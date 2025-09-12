using EtsZemun.Dtos.Response.User;
using EtsZemun.Errors;
using EtsZemun.Utilities;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Services.ModelServices.UserService;

public partial class UserService
{
    public async Task<Result<IEnumerable<AdminUserResponseDto>>> GetAll(
        int offset,
        int limit,
        string? search
    )
    {
        try
        {
            var result = context.Users.Select(u => new AdminUserResponseDto
            {
                Id = u.Id,
                Email = u.Email ?? "Unknown",
                Name = u.UserName ?? "Unknown",
                Verified = u.EmailConfirmed,
                Role =
                    context
                        .UserRoles.Where(ur => ur.UserId == u.Id)
                        .Join(context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name)
                        .FirstOrDefault() ?? "No Role",
            });

            if (!string.IsNullOrWhiteSpace(search))
                result = result.Where(u =>
                    EF.Functions.Like(u.Name.ToLower(), $"%{search.ToLower()}%")
                );

            result = result.OrderBy(u => u.Name);

            return Result.Ok((await result.ApplyOffsetAndLimit(offset, limit)).AsEnumerable());
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to get all users");
            return Result.Fail(new BadRequest("Failed to get all users"));
        }
    }
}
