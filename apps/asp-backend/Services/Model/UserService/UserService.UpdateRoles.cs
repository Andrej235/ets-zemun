using EtsZemun.Errors;
using EtsZemun.Utilities;
using FluentResults;

namespace EtsZemun.Services.ModelServices.UserService;

public partial class UserService
{
    public async Task<Result> SetAsUser(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            return Result.Fail(new NotFound("User not found"));

        var roles = await userManager.GetRolesAsync(user);
        await userManager.RemoveFromRolesAsync(user, roles);
        await userManager.AddToRoleAsync(user, Roles.User);
        return Result.Ok();
    }

    public async Task<Result> SetAsTeacher(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            return Result.Fail(new NotFound("User not found"));

        if (!user.EmailConfirmed)
            return Result.Fail(new BadRequest("Email not confirmed"));

        var roles = await userManager.GetRolesAsync(user);
        await userManager.RemoveFromRolesAsync(user, roles);
        await userManager.AddToRoleAsync(user, Roles.Teacher);
        return Result.Ok();
    }

    public async Task<Result> SetAsMod(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            return Result.Fail(new NotFound("User not found"));

        if (!user.EmailConfirmed)
            return Result.Fail(new BadRequest("Email not confirmed"));

        var roles = await userManager.GetRolesAsync(user);
        await userManager.RemoveFromRolesAsync(user, roles);
        await userManager.AddToRoleAsync(user, Roles.Mod);
        return Result.Ok();
    }

    public async Task<Result> SetAsAdmin(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            return Result.Fail(new NotFound("User not found"));

        if (!user.EmailConfirmed)
            return Result.Fail(new BadRequest("Email not confirmed"));

        var roles = await userManager.GetRolesAsync(user);
        await userManager.RemoveFromRolesAsync(user, roles);
        await userManager.AddToRoleAsync(user, Roles.Admin);
        return Result.Ok();
    }
}
