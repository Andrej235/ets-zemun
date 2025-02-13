using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.TeacherMappers;

public class CreateTeacherTranslationRequestMapper
    : IRequestMapper<CreateTeacherTranslationRequestDto, TeacherTranslation>
{
    public TeacherTranslation Map(CreateTeacherTranslationRequestDto request) =>
        new()
        {
            TeacherId = request.TeacherId,
            LanguageId = request.LanguageId,
            Name = request.Name,
            Bio = request.Bio,
            Title = request.Title,
        };
}
