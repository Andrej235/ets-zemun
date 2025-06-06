using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Dtos.Response.EducationalProfile;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public interface IEducationalProfileService
{
    Task<Result<SimpleEducationalProfileResponseDto>> Create(
        CreateEducationalProfileRequestDto request
    );

    Task<Result<IEnumerable<SimpleEducationalProfileResponseDto>>> GetAll();
    Task<Result<EducationalProfileResponseDto>> GetSingle(int id, string languageCode);

    Task<Result> UpdateName(UpdateEducationalProfileNameRequestDto request);
    Task<Result> Update(UpdateEducationalProfileRequestDto request);

    Task<Result> AddSubject(AddSubjectRequestDto request);
    Task<Result> UpdateSubject(UpdateProfileSubjectRequestDto request);
    Task<Result> RemoveSubject(RemoveSubjectRequestDto request);

    Task<Result> Delete(int id);
}
