using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.EducationalProfileMappers;

public class ProfileGeneralSubjectRequestMapper
    : IRequestMapper<CreateProfileSubjectRequestDto, EducationalProfileGeneralSubject>
{
    public EducationalProfileGeneralSubject Map(CreateProfileSubjectRequestDto from) =>
        new() { PerWeek = from.PerWeek, SubjectId = from.SubjectId };
}
