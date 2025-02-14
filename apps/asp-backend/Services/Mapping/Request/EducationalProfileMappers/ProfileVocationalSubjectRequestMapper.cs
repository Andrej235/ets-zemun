using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.EducationalProfileMappers;

public class ProfileVocationalSubjectRequestMapper
    : IRequestMapper<CreateProfileSubjectRequestDto, EducationalProfileVocationalSubject>
{
    public EducationalProfileVocationalSubject Map(CreateProfileSubjectRequestDto from) =>
        new() { PerWeek = from.PerWeek, SubjectId = from.SubjectId };
}
