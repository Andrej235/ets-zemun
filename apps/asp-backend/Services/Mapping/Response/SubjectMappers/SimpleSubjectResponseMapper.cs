using EtsZemun.DTOs.Response.Subject;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.SubjectMappers;

public class SimpleSubjectResponseMapper : IResponseMapper<Subject, SimpleSubjectResponseDto>
{
    public SimpleSubjectResponseDto Map(Subject from)
    {
        var translation = from.Translations.First();

        return new() { Id = from.Id, Name = translation.Name };
    }
}
