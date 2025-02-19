namespace EtsZemun.DTOs.Request.Subject;

public class CreateSubjectRequestDto
{
    public string LanguageCode { get; set; } = null!;

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}
