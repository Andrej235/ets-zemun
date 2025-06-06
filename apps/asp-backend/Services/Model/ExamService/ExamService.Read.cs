using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.ExamService;

public partial class ExamService
{
    public async Task<Result<IEnumerable<ExamResponseDto>>> GetAll(string languageCode)
    {
        var result = await readService.Get(
            null,
            0,
            -1,
            q =>
                q.Include(x => x.Subject)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.Commission)
                    .ThenInclude(x => x.Teacher)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .OrderBy(x => x.StartTime)
        );

        if (result.IsFailed)
            return Result.Fail<IEnumerable<ExamResponseDto>>(result.Errors);

        return Result.Ok(result.Value.Select(responseMapper.Map));
    }
}
