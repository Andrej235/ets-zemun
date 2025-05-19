using EtsZemun.Dtos.Response.Qualification;
using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Dtos.Response.Translations;

namespace EtsZemun.Dtos.Response.Teacher;

public class AdminFullTeacherResponseDto
{
    public int Id { get; set; }
    public IEnumerable<
        TranslationWrapper<AdminFullTeacherTranslationResponseDto>
    > Translations { get; set; } = [];
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;
    public IEnumerable<AdminQualificationResponseDto> Qualifications { get; set; } = [];
    public IEnumerable<SimpleSubjectResponseDto> Subjects { get; set; } = [];
}
