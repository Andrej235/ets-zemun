using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Dtos.Response.Translations;

namespace EtsZemun.Dtos.Response.Subject;

public class AdminFullSubjectResponseDto
{
    public int Id { get; set; }
    public IEnumerable<
        TranslationWrapper<AdminFullSubjectTranslationDto>
    > Translations { get; set; } = [];

    public IEnumerable<SimpleTeacherResponseDto> Teachers { get; set; } = [];
}
