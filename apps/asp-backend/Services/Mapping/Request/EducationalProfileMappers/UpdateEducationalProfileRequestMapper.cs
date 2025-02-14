using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.EducationalProfileMappers;

public class UpdateEducationalProfileRequestMapper(
    IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileGeneralSubject
    > generalSubjectMapper,
    IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileVocationalSubject
    > vocationalSubjectMapper
) : IRequestMapper<UpdateEducationalProfileRequestDto, EducationalProfile>
{
    private readonly IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileGeneralSubject
    > generalSubjectMapper = generalSubjectMapper;
    private readonly IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileVocationalSubject
    > vocationalSubjectMapper = vocationalSubjectMapper;

    public EducationalProfile Map(UpdateEducationalProfileRequestDto from) =>
        new()
        {
            Id = from.Id,
            GeneralSubjects = [.. from.GeneralSubjects.Select(g => generalSubjectMapper.Map(g))],
            VocationalSubjects =
            [
                .. from.VocationalSubjects.Select(v => vocationalSubjectMapper.Map(v)),
            ],
        };
}
