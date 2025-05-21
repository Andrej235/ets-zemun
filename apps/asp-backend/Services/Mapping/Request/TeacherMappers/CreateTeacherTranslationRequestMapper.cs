using EtsZemun.Dtos.Request.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.TeacherMappers;

public class CreateTeacherTranslationRequestMapper
    : IRequestMapper<CreateTeacherTranslationRequestDto, TeacherTranslation>
{
    public TeacherTranslation Map(CreateTeacherTranslationRequestDto request) =>
        new()
        {
            TeacherId = request.TeacherId,
            LanguageCode = request.LanguageCode,
            Name = request.Name,
            Bio = request.Bio,
            Title = request.Title,
        };
}
