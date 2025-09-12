namespace EtsZemun.Dtos.Request.Qualification;

public class CreateQualificationRequestDto
{
    public int TeacherId { get; set; }
    public DateTime DateObtained { get; set; }
    public IEnumerable<CreateQualificationTranslationRequestDto> Translations { get; set; } = null!;
}
