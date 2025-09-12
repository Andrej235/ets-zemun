namespace EtsZemun.Dtos.Response.Translations;

public class TranslationWrapper<T>
    where T : class
{
    public string LanguageCode { get; set; } = null!;
    public T Value { get; set; } = null!;
}
