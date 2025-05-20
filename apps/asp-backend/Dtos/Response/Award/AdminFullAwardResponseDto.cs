using EtsZemun.Dtos.Response.Translations;

namespace EtsZemun.Dtos.Response.Award;

public class AdminFullAwardResponseDto
{
    public int Id { get; set; }
    public string Image { get; set; } = null!;
    public DateOnly DayOfAward { get; set; }
    public string? ExternalLink { get; set; }
    public IEnumerable<
        TranslationWrapper<AdminAwardTranslationResponseDto>
    > Translations { get; set; } = null!;
}
