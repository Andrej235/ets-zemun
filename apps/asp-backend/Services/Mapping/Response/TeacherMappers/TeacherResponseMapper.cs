using EtsZemun.DTOs.Response.Qualification;
using EtsZemun.DTOs.Response.Subject;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.TeacherMappers;

public class TeacherResponseMapper(
    IResponseMapper<Qualification, QualificationResponseDto> qualificationMapper,
    IResponseMapper<Subject, SimpleSubjectResponseDto> subjectMapper
) : IResponseMapper<Teacher, TeacherResponseDto>
{
    private readonly IResponseMapper<Qualification, QualificationResponseDto> qualificationMapper =
        qualificationMapper;
    private readonly IResponseMapper<Subject, SimpleSubjectResponseDto> subjectMapper =
        subjectMapper;

    public TeacherResponseDto Map(Teacher from)
    {
        var translation = from.Translations.FirstOrDefault();

        return new()
        {
            Id = from.Id,
            Bio = translation?.Bio ?? "",
            Name = translation?.Name ?? "",
            Title = translation?.Title ?? "",
            Email = from.Email,
            Image = from.Image,
            StartOfOpenOfficeHoursFirstShift = from.StartOfOpenOfficeHoursFirstShift,
            StartOfOpenOfficeHoursSecondShift = from.StartOfOpenOfficeHoursSecondShift,
            Qualifications = from.Qualifications.Select(qualificationMapper.Map),
            Subjects = from.Subjects.Select(subjectMapper.Map),
        };
    }
}
