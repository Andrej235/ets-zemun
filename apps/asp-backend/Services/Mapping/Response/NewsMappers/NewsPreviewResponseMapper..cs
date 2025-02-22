using EtsZemun.DTOs.Response.News;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.NewsMappers;

public class NewsPreviewResponseMapper : IResponseMapper<News, NewsPreviewResponseDto>
{
    public NewsPreviewResponseDto Map(News from)
    {
        var translation = from.Translations.FirstOrDefault();

        return new()
        {
            Id = from.Id,
            Date = from.Date,
            PreviewImage = from.PreviewImage,
            Title = translation?.Title ?? "",
            Description = translation?.Description ?? "",
            IsApproved = from.IsApproved,
        };
    }
}
