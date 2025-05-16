using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.EducationalProfileMappers;

public class CreateEducationalProfileRequestMapper(
    IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileGeneralSubject
    > generalSubjectMapper,
    IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileVocationalSubject
    > vocationalSubjectMapper
) : IRequestMapper<CreateEducationalProfileRequestDto, EducationalProfile>
{
    private readonly IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileGeneralSubject
    > generalSubjectMapper = generalSubjectMapper;
    private readonly IRequestMapper<
        CreateProfileSubjectRequestDto,
        EducationalProfileVocationalSubject
    > vocationalSubjectMapper = vocationalSubjectMapper;

    public EducationalProfile Map(CreateEducationalProfileRequestDto from) =>
        new()
        {
            Name = from.Name,
            GeneralSubjects = [.. from.GeneralSubjects.Select(g => generalSubjectMapper.Map(g))],
            VocationalSubjects =
            [
                .. from.VocationalSubjects.Select(v => vocationalSubjectMapper.Map(v)),
            ],
        };
}
