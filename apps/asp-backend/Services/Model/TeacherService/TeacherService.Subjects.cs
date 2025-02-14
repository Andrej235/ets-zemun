using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.TeacherService;

public partial class TeacherService
{
    public Task<Result> AddSubject(AddSubjectsToTeacherRequestDto request) =>
        createTeacherSubjectService.Add(
            request.SubjectIds.Select(x => new TeacherSubject
            {
                SubjectId = x,
                TeacherId = request.TeacherId,
            })
        );

    public Task<Result> RemoveSubject(int teacherId, int subjectId) =>
        deleteTeacherSubjectService.Delete(x =>
            x.TeacherId == teacherId && x.SubjectId == subjectId
        );
}
