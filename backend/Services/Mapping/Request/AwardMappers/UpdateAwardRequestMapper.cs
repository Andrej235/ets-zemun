using EtsZemun.Dtos.Request.Award;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.AwardMappers;

public class UpdateAwardRequestMapper : IRequestMapper<UpdateAwardRequestDto, Award>
{
    public Award Map(UpdateAwardRequestDto from) =>
        new()
        {
            Id = from.Id,
            Image = from.Image,
            ExternalLink = from.ExternalLink,
            DayOfAward = from.DayOfAward,
        };
}
