using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.DTOs.Response.EducationalProfile;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public interface IEducationalProfileService
{
    Task<Result> Create(CreateEducationalProfileRequestDto request);

    Task<Result<IEnumerable<EducationalProfileResponseDto>>> GetAll();
    Task<Result<EducationalProfileResponseDto>> GetSingle(int id);

    Task<Result> Update(UpdateEducationalProfileRequestDto request);

    Task<Result> Delete(int id);
}
