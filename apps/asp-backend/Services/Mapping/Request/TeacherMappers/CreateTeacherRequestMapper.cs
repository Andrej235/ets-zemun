using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.TeacherMappers;

public class CreateTeacherRequestMapper(
    IRequestMapper<CreateTeacherTranslationRequestDto, TeacherTranslation> translationMapper
) : IRequestMapper<CreateTeacherRequestDto, Teacher>
{
    private readonly IRequestMapper<
        CreateTeacherTranslationRequestDto,
        TeacherTranslation
    > translationMapper = translationMapper;

    public Teacher Map(CreateTeacherRequestDto request) =>
        new()
        {
            Image = request.Image,
            Email = request.Email,
            StartOfOpenOfficeHoursFirstShift = null,
            StartOfOpenOfficeHoursSecondShift = null,
            Translations = [translationMapper.Map(request.Translation)],
            Qualifications = [],
            Subjects = [],
        };
}
