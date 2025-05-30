using System.Security.Claims;
using EtsZemun.Dtos.Response.Admin;
using FluentResults;

namespace EtsZemun.Services.Model.AdminService;

public interface IAdminService
{
    Task<Result<AdminOverviewResponseDto>> GetOverview(ClaimsPrincipal user);
}
