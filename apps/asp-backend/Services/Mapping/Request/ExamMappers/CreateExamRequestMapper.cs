using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Request.ExamMappers;

public class CreateExamRequestMapper : IRequestMapper<CreateExamRequestDto, Exam>
{
    public Exam Map(CreateExamRequestDto from) =>
        new()
        {
            Cabinet = from.Cabinet,
            StartTime = DateTime.SpecifyKind(from.StartTime, DateTimeKind.Utc),
            SubjectId = from.SubjectId,
            Commission =
            [
                .. from.Commission.Select(x => new ExamCommissionMember()
                {
                    ExamId = 0,
                    TeacherId = x,
                }),
            ],
        };
}
