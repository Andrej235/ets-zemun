namespace EtsZemun.DTOs.Request.Teacher;

public class UpdateTeacherTranslationRequestDto
{
    public int TeacherId { get; set; }
    public int LanguageId { get; set; }

    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Bio { get; set; } = null!;
}
