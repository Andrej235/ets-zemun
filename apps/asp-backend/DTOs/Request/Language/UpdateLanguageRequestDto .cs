namespace EtsZemun.DTOs.Request.Language;

public class UpdateLanguageRequestDto
{
    public string OldCode { get; set; } = null!;
    public string NewCode { get; set; } = null!;
    public string FullName { get; set; } = null!;
}
