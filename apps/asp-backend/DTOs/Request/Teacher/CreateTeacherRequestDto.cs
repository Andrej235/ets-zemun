namespace EtsZemun.DTOs.Request.Teacher;

public class CreateTeacherRequestDto
{
    public string Email { get; set; } = null!;
    public string Image { get; set; } = null!;
    public CreateTeacherTranslationRequestDto Translation { get; set; } = null!;
}
