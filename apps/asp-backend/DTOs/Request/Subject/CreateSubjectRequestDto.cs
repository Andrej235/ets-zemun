namespace EtsZemun.DTOs.Request.Subject;

public class CreateSubjectRequestDto
{
    public int LanguageId { get; set; }

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
