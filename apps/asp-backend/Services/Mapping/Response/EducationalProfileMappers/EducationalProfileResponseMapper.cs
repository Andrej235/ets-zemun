using EtsZemun.DTOs.Response.EducationalProfile;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.EducationalProfileMappers;

public class EducationalProfileResponseMapper(
    IResponseMapper<
        EducationalProfileGeneralSubject,
        ProfileSubjectResponseDto
    > generalSubjectMapper,
    IResponseMapper<
        EducationalProfileVocationalSubject,
        ProfileSubjectResponseDto
    > vocationalSubjectMapper
) : IResponseMapper<EducationalProfile, EducationalProfileResponseDto>
{
    private readonly IResponseMapper<
        EducationalProfileGeneralSubject,
        ProfileSubjectResponseDto
    > generalSubjectMapper = generalSubjectMapper;
    private readonly IResponseMapper<
        EducationalProfileVocationalSubject,
        ProfileSubjectResponseDto
    > vocationalSubjectMapper = vocationalSubjectMapper;

    public EducationalProfileResponseDto Map(EducationalProfile from) =>
        new()
        {
            Id = from.Id,
            GeneralSubjects = [.. from.GeneralSubjects.Select(generalSubjectMapper.Map)],
            VocationalSubjects = [.. from.VocationalSubjects.Select(vocationalSubjectMapper.Map)],
        };
}
