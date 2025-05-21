using EtsZemun.Dtos.Response.News;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.NewsMappers;

public class NewsResponseMapper() : IResponseMapper<News, NewsResponseDto>
{
    public NewsResponseDto Map(News from) =>
        new()
        {
            Id = from.Id,
            Markup = from.Translations.FirstOrDefault()?.Markup ?? "",
            IsApproved = from.IsApproved,
        };
}
