using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.ExamMappers;

public class UpdateExamRequestMapper : IRequestMapper<UpdateExamRequestDto, Exam>
{
    public Exam Map(UpdateExamRequestDto from) =>
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
