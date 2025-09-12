using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Dtos.Response.EducationalProfile;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public partial class EducationalProfileService
{
    public async Task<Result<SimpleEducationalProfileResponseDto>> Create(
        CreateEducationalProfileRequestDto request
    )
    {
        var result = await createSingle.Add(new EducationalProfile() { Name = request.Name });
        if (result.IsFailed)
            return Result.Fail(result.Errors);

        return new SimpleEducationalProfileResponseDto()
        {
            Id = result.Value.Id,
            Name = result.Value.Name,
            YearsCount = 0,
        };
    }
}
