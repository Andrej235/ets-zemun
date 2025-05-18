namespace EtsZemun.Dtos.Request.Teacher;

public class CreateTeacherRequestDto
{
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;
    public IEnumerable<CreateTeacherTranslationRequestDto> Translations { get; set; } = null!;
}
