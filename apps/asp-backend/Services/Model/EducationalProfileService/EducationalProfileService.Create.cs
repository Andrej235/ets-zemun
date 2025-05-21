using EtsZemun.Dtos.Request.EducationalProfile;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public partial class EducationalProfileService
{
    public async Task<Result> Create(CreateEducationalProfileRequestDto request)
    {
        var result = await createSingle.Add(createRequestMapper.Map(request));
        return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
    }
}
