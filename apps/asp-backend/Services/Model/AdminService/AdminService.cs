using System.Security.Claims;
using EtsZemun.Data;
using EtsZemun.Dtos.Response.Admin;
using EtsZemun.Errors;
using EtsZemun.Models;
using EtsZemun.Services.Read;
using EtsZemun.Utilities;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Services.Model.AdminService;

public class AdminService(
    DataContext context,
    ICountService<News> newsCountService,
    IReadRangeSelectedService<Language> languageReadService,
    ICountService<Subject> subjectCountService,
    ICountService<EducationalProfile> educationalProfileCountService,
    ICountService<Teacher> teacherCountService,
    ICountService<Award> awardCountService,
    UserManager<User> userManager
) : IAdminService
{
    public async Task<Result<AdminOverviewResponseDto>> GetOverview(ClaimsPrincipal user)
    {
        var totalNewsResult = await newsCountService.Count(null);
        if (totalNewsResult.IsFailed)
            return Result.Fail<AdminOverviewResponseDto>(totalNewsResult.Errors);

        var unapprovedNewsResult = await newsCountService.Count(x => !x.IsApproved);
        if (unapprovedNewsResult.IsFailed)
            return Result.Fail<AdminOverviewResponseDto>(unapprovedNewsResult.Errors);

        var languagesResult = await languageReadService.Get(x => x.FullName, null);
        if (languagesResult.IsFailed)
            return Result.Fail<AdminOverviewResponseDto>(languagesResult.Errors);

        var subjectsResult = await subjectCountService.Count(null);
        if (subjectsResult.IsFailed)
            return Result.Fail<AdminOverviewResponseDto>(subjectsResult.Errors);

        var educationalProfilesResult = await educationalProfileCountService.Count(null);
        if (educationalProfilesResult.IsFailed)
            return Result.Fail<AdminOverviewResponseDto>(educationalProfilesResult.Errors);

        var teachersResult = await teacherCountService.Count(null);
        if (teachersResult.IsFailed)
            return Result.Fail<AdminOverviewResponseDto>(teachersResult.Errors);

        var awardsResult = await awardCountService.Count(null);
        if (awardsResult.IsFailed)
            return Result.Fail<AdminOverviewResponseDto>(awardsResult.Errors);

        var userLoginsResult = await GetUserLoginsOverview(user);

        return new AdminOverviewResponseDto()
        {
            NewsCount = totalNewsResult.Value,
            UnapprovedNewsCount = unapprovedNewsResult.Value,
            LanguagesCount = languagesResult.Value.Count(),
            Languages = languagesResult.Value,
            SubjectsCount = subjectsResult.Value,
            ProfilesCount = educationalProfilesResult.Value,
            TeachersCount = teachersResult.Value,
            AwardsCount = awardsResult.Value,
            Logins = userLoginsResult.ValueOrDefault ?? [],
        };
    }

    private async Task<
        Result<IEnumerable<AdminUserLoginOverviewResponseDto>>
    > GetUserLoginsOverview(ClaimsPrincipal userClaim)
    {
        try
        {
            var user = await userManager.GetUserAsync(userClaim);
            if (user is null || !user.EmailConfirmed)
                return Result.Fail(new Forbidden("User not found or not confirmed"));

            var isAdmin = await userManager.IsInRoleAsync(user, Roles.Admin);

            return await context
                .UserLoginEvent.Where(isAdmin ? (x => x.User != null) : (x => x.UserId == user.Id))
                .Join(
                    context.Users,
                    login => login.UserId,
                    user => user.Id,
                    (login, user) => new { login, user }
                )
                .GroupJoin(
                    context.UserRoles,
                    combined => combined.user.Id,
                    userRole => userRole.UserId,
                    (combined, userRoles) =>
                        new
                        {
                            combined.login,
                            combined.user,
                            userRoles,
                        }
                )
                .SelectMany(
                    x => x.userRoles.DefaultIfEmpty(),
                    (x, userRole) =>
                        new
                        {
                            x.login,
                            x.user,
                            userRole,
                        }
                )
                .GroupJoin(
                    context.Roles,
                    combined => combined.userRole!.RoleId,
                    role => role.Id,
                    (combined, roles) =>
                        new
                        {
                            combined.login,
                            combined.user,
                            roles,
                        }
                )
                .SelectMany(
                    x => x.roles.DefaultIfEmpty(),
                    (x, role) =>
                        new AdminUserLoginOverviewResponseDto
                        {
                            Name = x.user.UserName ?? "Unknown",
                            LoginTime = x.login.LoginTime,
                            Role = role == null ? "No Role" : role.Name ?? "No Role",
                        }
                )
                .OrderByDescending(x => x.LoginTime)
                .Take(10)
                .Reverse()
                .ToListAsync();
        }
        catch (Exception ex)
        {
            return Result.Fail(ex.Message);
        }
    }
}
