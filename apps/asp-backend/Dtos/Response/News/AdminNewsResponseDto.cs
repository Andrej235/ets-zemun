using EtsZemun.Dtos.Response.Translations;

namespace EtsZemun.Dtos.Response.News;

public class AdminNewsResponseDto
{
    public int Id { get; set; }
    public string PreviewImage { get; set; } = null!;
    public DateOnly Date { get; set; }
    public bool IsApproved { get; set; }
    public IEnumerable<
        TranslationWrapper<AdminNewsTranslationResponseDto>
    > Translations { get; set; } = null!;
}
