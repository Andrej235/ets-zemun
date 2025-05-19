using EtsZemun.Dtos.Request.Teacher;
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

    public async Task<Result> ReplaceSubjects(ReplaceTeacherSubjectsRequestDto request)
    {
        var deleteResult = await deleteTeacherSubjectService.Delete(
            x => x.TeacherId == request.TeacherId,
            false
        );

        if (deleteResult.IsFailed)
            return Result.Fail(deleteResult.Errors);

        return await createTeacherSubjectService.Add(
            request.SubjectIds.Select(x => new TeacherSubject
            {
                SubjectId = x,
                TeacherId = request.TeacherId,
            })
        );
    }
}
