namespace EtsZemun.Dtos.Request.Subject;

public class CreateSubjectRequestDto
{
    public IEnumerable<CreateSubjectTranslationRequestDto> Translations { get; set; } = null!;
    public IEnumerable<int> Teachers { get; set; } = null!;
}
