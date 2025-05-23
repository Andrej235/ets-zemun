using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.SubjectMappers;

public class SimpleSubjectResponseMapper : IResponseMapper<Subject, SimpleSubjectResponseDto>
{
    public SimpleSubjectResponseDto Map(Subject from)
    {
        var translation = from.Translations.FirstOrDefault();

        return new()
        {
            Id = from.Id,
            Name = translation?.Name ?? "",
            Description = translation?.Description ?? "",
        };
    }
}
