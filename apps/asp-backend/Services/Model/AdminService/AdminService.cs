using EtsZemun.Dtos.Response.Admin;
using EtsZemun.Models;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.AdminService;

public class AdminService(
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
        };
    }
}
