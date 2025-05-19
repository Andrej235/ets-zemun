namespace EtsZemun.Dtos.Request.Qualification;

public class UpdateQualificationRequestDto
{
    public int Id { get; set; }
    public DateTime DateObtained { get; set; }
    public IEnumerable<UpdateQualificationTranslationRequestDto> Translations { get; set; } = null!;
}
