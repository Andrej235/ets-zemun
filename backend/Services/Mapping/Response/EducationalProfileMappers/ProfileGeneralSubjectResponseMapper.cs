using EtsZemun.Dtos.Response.EducationalProfile;
using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.EducationalProfileMappers;

public class ProfileGeneralSubjectResponseMapper(
    IResponseMapper<Subject, SimpleSubjectResponseDto> subjectMapper
) : IResponseMapper<EducationalProfileGeneralSubject, ProfileSubjectResponseDto>
{
    private readonly IResponseMapper<Subject, SimpleSubjectResponseDto> subjectMapper =
        subjectMapper;

    public ProfileSubjectResponseDto Map(EducationalProfileGeneralSubject from) =>
        new()
        {
            PerWeek = from.PerWeek,
            Year = from.Year,
            SubjectId = from.SubjectId,
            Subject = subjectMapper.Map(from.Subject),
        };
}
