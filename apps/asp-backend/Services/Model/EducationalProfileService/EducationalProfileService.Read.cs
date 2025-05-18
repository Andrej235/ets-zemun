using EtsZemun.Dtos.Response.EducationalProfile;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public partial class EducationalProfileService
{
    public Task<Result<IEnumerable<SimpleEducationalProfileResponseDto>>> GetAll()
    {
        return readRangeService.Get(
            x => new SimpleEducationalProfileResponseDto
            {
                Id = x.Id,
                Name = x.Name,
                YearsCount = x
                    .GeneralSubjects.Select(x => x.Year)
                    .Concat(x.VocationalSubjects.Select(x => x.Year))
                    .Distinct()
                    .Count(),
            },
            null,
            null,
            -1
        );
    }

    public async Task<Result<EducationalProfileResponseDto>> GetSingle(int id, string languageCode)
    {
        var result = await readSingleService.Get(
            x => x.Id == id,
            q =>
                q.Include(x => x.GeneralSubjects)
                    .ThenInclude(x => x.Subject)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.VocationalSubjects)
                    .ThenInclude(x => x.Subject)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        return result.IsFailed
            ? Result.Fail<EducationalProfileResponseDto>(result.Errors)
            : Result.Ok(responseMapper.Map(result.Value));
    }
}
