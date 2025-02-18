using EtsZemun.DTOs.Response.EducationalProfile;
using EtsZemun.DTOs.Response.Subject;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.EducationalProfileMappers;

public class ProfileVocationalSubjectResponseMapper(
    IResponseMapper<Subject, SimpleSubjectResponseDto> subjectMapper
) : IResponseMapper<EducationalProfileVocationalSubject, ProfileSubjectResponseDto>
{
    private readonly IResponseMapper<Subject, SimpleSubjectResponseDto> subjectMapper =
        subjectMapper;

    public ProfileSubjectResponseDto Map(EducationalProfileVocationalSubject from) =>
        new()
        {
            PerWeek = from.PerWeek,
            Year = from.Year,
            SubjectId = from.SubjectId,
            Subject = subjectMapper.Map(from.Subject),
        };
}
