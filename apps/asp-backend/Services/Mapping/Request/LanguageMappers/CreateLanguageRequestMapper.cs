using EtsZemun.DTOs.Request.Language;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.LanguageMappers;

public class CreateLanguageRequestMapper : IRequestMapper<CreateLanguageRequestDto, Language>
{
    public Language Map(CreateLanguageRequestDto from) =>
        new() { Code = from.Code, FullName = from.FullName };
}
