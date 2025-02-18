using EtsZemun.DTOs.Response.Award;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.AwardMappers;

public class AwardResponseMapper(IResponseMapper<Teacher, TeacherResponseDto> teacherMapper)
    : IResponseMapper<Award, AwardResponseDto>
{
    private readonly IResponseMapper<Teacher, TeacherResponseDto> teacherMapper = teacherMapper;

    public AwardResponseDto Map(Award from)
    {
        var translation = from.Translations.FirstOrDefault();

        return new()
        {
            Id = from.Id,
            Image = from.Image,
            ExternalLink = from.ExternalLink,
            DayOfAward = from.DayOfAward,
            TeacherId = from.TeacherId,
            Competition = translation?.Competition ?? "",
            Title = translation?.Title ?? "",
            Description = translation?.Description ?? "",
            Student = translation?.Student ?? "",
            Teacher = from.Teacher is null ? null : teacherMapper.Map(from.Teacher),
        };
    }
}
