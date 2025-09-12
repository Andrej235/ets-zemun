using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.TeacherMappers;

public class SimpleTeacherResponseMapper : IResponseMapper<Teacher, SimpleTeacherResponseDto>
{
    public SimpleTeacherResponseDto Map(Teacher from) =>
        new()
        {
            Id = from.Id,
            Name = from.Translations.FirstOrDefault()?.Name ?? "",
            Title = from.Translations.FirstOrDefault()?.Title ?? "",
        };
}
