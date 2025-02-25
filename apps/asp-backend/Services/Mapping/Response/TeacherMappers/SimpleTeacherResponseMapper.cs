using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.TeacherMappers;

public class SimpleTeacherResponseMapper : IResponseMapper<Teacher, SimpleTeacherResponseDto>
{
    public SimpleTeacherResponseDto Map(Teacher from) =>
        new()
        {
            Id = from.Id,
            Image = from.Image,
            Name = from.Translations.FirstOrDefault()?.Name ?? "",
        };
}
