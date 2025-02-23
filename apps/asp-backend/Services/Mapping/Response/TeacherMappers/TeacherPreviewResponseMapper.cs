using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.TeacherMappers;

public class TeacherPreviewResponseMapper : IResponseMapper<Teacher, TeacherPreviewResponseDto>
{
    public TeacherPreviewResponseDto Map(Teacher from) =>
        new() { Id = from.Id, Name = from.Translations.FirstOrDefault()?.Name ?? "" };
}
