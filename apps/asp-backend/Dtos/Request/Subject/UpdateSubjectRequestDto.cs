namespace EtsZemun.Dtos.Request.Subject;

public class UpdateSubjectRequestDto
{
    public int Id { get; set; }
    public IEnumerable<UpdateSubjectTranslationRequestDto> Translations { get; set; } = null!;
    public IEnumerable<int> Teachers { get; set; } = null!;
}
