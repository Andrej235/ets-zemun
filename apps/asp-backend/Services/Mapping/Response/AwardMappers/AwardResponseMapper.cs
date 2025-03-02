using EtsZemun.DTOs.Response.Award;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.AwardMappers;

public class AwardResponseMapper : IResponseMapper<Award, AwardResponseDto>
{
    public AwardResponseDto Map(Award from)
    {
        var translation = from.Translations.FirstOrDefault();

        return new()
        {
            Id = from.Id,
            Image = from.Image,
            ExternalLink = from.ExternalLink,
            DayOfAward = from.DayOfAward,
            Competition = translation?.Competition ?? "",
            Title = translation?.Title ?? "",
            Description = translation?.Description ?? "",
            Student = translation?.Student ?? "",
        };
    }
}
