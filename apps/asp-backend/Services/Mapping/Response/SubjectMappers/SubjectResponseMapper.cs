using EtsZemun.DTOs.Response.Subject;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.SubjectMappers;

public class SubjectResponseMapper(IResponseMapper<Teacher, TeacherResponseDto> teacherMapper)
    : IResponseMapper<Subject, SubjectResponseDto>
{
    private readonly IResponseMapper<Teacher, TeacherResponseDto> teacherMapper = teacherMapper;

    public SubjectResponseDto Map(Subject from)
    {
        var translation = from.Translations.FirstOrDefault();

        return new()
        {
            Id = from.Id,
            Name = translation?.Name ?? "",
            Description = translation?.Description ?? "",
            Teachers = new() { Items = from.Teachers.Select(teacherMapper.Map) },
        };
    }
}
