using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.ExamMappers;

public class ExamResponseMapper() : IResponseMapper<Exam, ExamResponseDto>
{
    public ExamResponseDto Map(Exam from) =>
        new()
        {
            Id = from.Id,
            Cabinet = from.Cabinet,
            Commission = from.Commission,
            Date = from.Date,
            StartTime = from.StartTime,
            Subject = from.Subject,
        };
}
