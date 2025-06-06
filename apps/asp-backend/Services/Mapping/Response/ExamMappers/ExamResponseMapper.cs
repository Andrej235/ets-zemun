using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.ExamMappers;

public class ExamResponseMapper : IResponseMapper<Exam, ExamResponseDto>
{
    public ExamResponseDto Map(Exam from) =>
        new()
        {
            Id = from.Id,
            Cabinet = from.Cabinet,
            StartTime = from.StartTime,
            SubjectId = from.SubjectId,
            Subject = from.Subject.Translations.FirstOrDefault()?.Name ?? "",
            Commission = from.Commission.Select(x =>
                x.Teacher.Translations.FirstOrDefault()?.Name ?? ""
            ),
        };
}
