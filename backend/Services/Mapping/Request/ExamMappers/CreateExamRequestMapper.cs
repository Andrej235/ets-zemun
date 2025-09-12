using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.ExamMappers;

public class CreateExamRequestMapper : IRequestMapper<CreateExamRequestDto, Exam>
{
    public Exam Map(CreateExamRequestDto from) =>
        new()
        {
            Cabinet = from.Cabinet,
            Commission = from.Commission,
            Date = from.Date,
            StartTime = from.StartTime,
            Subject = from.Subject,
        };
}
