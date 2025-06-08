using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Models;

namespace EtsZemun.Services.Mapping.Response.ExamMappers;

public class ExamResponseMapper(
    IResponseMapper<Subject, SimpleSubjectResponseDto> subjectResponseMapper,
    IResponseMapper<Teacher, SimpleTeacherResponseDto> teacherResponseMapper
) : IResponseMapper<Exam, ExamResponseDto>
{
    public ExamResponseDto Map(Exam from) =>
        new()
        {
            Id = from.Id,
            Cabinet = from.Cabinet,
            StartTime = DateTime.SpecifyKind(from.StartTime, DateTimeKind.Local),
            Subject = subjectResponseMapper.Map(from.Subject),
            Commission = from.Commission.Select(x => teacherResponseMapper.Map(x.Teacher)),
        };
}
