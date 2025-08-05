using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.ExamService;

public partial class ExamService
{
    public async Task<Result<IEnumerable<ExamResponseDto>>> GetAll(string languageCode)
    {
        var result = await readService.Get(null, 0, -1, q => q.OrderBy(x => x.Id));

        if (result.IsFailed)
            return Result.Fail<IEnumerable<ExamResponseDto>>(result.Errors);

        return Result.Ok(result.Value.Select(responseMapper.Map));
    }

    public async Task<Result<ExamResponseDto>> AdminGetSingle(int id)
    {
        var result = await readSingleService.Get(x => x.Id == id);

        if (result.IsFailed)
            return Result.Fail<ExamResponseDto>(result.Errors);

        return Result.Ok(responseMapper.Map(result.Value));
    }
}
