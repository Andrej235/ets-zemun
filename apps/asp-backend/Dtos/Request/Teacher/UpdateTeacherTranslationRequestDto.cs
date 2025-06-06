namespace EtsZemun.Dtos.Request.Teacher;

public class UpdateTeacherTranslationRequestDto
{
    public int TeacherId { get; set; }
    public string LanguageCode { get; set; } = null!;

    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Bio { get; set; } = null!;
}
