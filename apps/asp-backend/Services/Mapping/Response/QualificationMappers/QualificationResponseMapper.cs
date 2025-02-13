using EtsZemun.DTOs.Response.Qualification;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.QualificationMappers;

public class QualificationResponseMapper : IResponseMapper<Qualification, QualificationResponseDto>
{
    public QualificationResponseDto Map(Qualification from)
    {
        var translation = from.Translations.FirstOrDefault();

        return new()
        {
            Id = from.Id,
            DateObtained = from.DateObtained,
            Name = translation?.Name ?? "",
            Description = translation?.Description ?? "",
        };
    }
}
