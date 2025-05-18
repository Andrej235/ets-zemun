using EtsZemun.Data;
using EtsZemun.Dtos.Response.Admin;
using EtsZemun.Models;
using EtsZemun.Services.Read;
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
    ICountService<Award> awardCountService
) : IAdminService
{
    public async Task<Result<AdminOverviewResponseDto>> GetOverview()
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

        var userLoginsResult = await GetUserLoginsOverview();

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
    > GetUserLoginsOverview()
    {
        try
        {
            return await (
                from login in context.UserLoginEvent
                join user in context.Users on login.UserId equals user.Id
                join userRole in context.UserRoles on user.Id equals userRole.UserId into userRoles
                from userRole in userRoles.DefaultIfEmpty()
                join role in context.Roles on userRole.RoleId equals role.Id into roles
                from role in roles.DefaultIfEmpty()
                orderby login.LoginTime descending
                select new
                {
                    login.UserId,
                    UserName = user.UserName,
                    login.LoginTime,
                    RoleName = role != null ? role.Name : null,
                }
            )
                .Take(10)
                .GroupBy(x => new
                {
                    x.UserId,
                    x.UserName,
                    x.LoginTime,
                })
                .Select(g => new AdminUserLoginOverviewResponseDto
                {
                    Name = g.Key.UserName,
                    LoginTime = g.Key.LoginTime,
                    Role =
                        g.Where(x => x.RoleName != null)
                            .Select(x => x.RoleName)
                            .Distinct()
                            .FirstOrDefault() ?? "No Role",
                })
                .ToListAsync();
        }
        catch (Exception ex)
        {
            return Result.Fail(ex.Message);
        }
    }
}
