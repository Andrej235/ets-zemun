using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.DTOs.Response.EducationalProfile;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public interface IEducationalProfileService
{
    Task<Result> Create(CreateEducationalProfileRequestDto request);

    Task<Result<IEnumerable<SimpleEducationalProfileResponseDto>>> GetAll(string languageCode);
    Task<Result<EducationalProfileResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> Update(UpdateEducationalProfileRequestDto request);

    Task<Result> Delete(int id);
}
