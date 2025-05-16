using EtsZemun.Dtos.Response.EducationalProfile;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.EducationalProfileMappers;

public class SimpleEducationalProfilesResponseMapper
    : IResponseMapper<EducationalProfile, SimpleEducationalProfileResponseDto>
{
    public SimpleEducationalProfileResponseDto Map(EducationalProfile from) =>
        new() { Id = from.Id, Name = from.Name };
}
