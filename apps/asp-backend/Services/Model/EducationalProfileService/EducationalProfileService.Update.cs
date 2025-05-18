using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public partial class EducationalProfileService
{
    public async Task<Result> Update(UpdateEducationalProfileRequestDto request)
    {
        var deleteResult1 = await deleteGeneralSubjectService.Delete(
            x => x.EducationalProfileId == request.Id,
            false
        );
        var deleteResult2 = await deleteVocationalSubjectService.Delete(
            x => x.EducationalProfileId == request.Id,
            false
        );

        if (deleteResult1.IsFailed || deleteResult2.IsFailed)
            return Result.Fail([.. deleteResult1.Errors, .. deleteResult2.Errors]);

        var result = await updateSingle.Update(updateRequestMapper.Map(request));
        return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
    }

    public async Task<Result> AddSubject(AddSubjectRequestDto request)
    {
        if (request.Type == AddSubjectRequestDto.SubjectType.General)
        {
            var result = await createGeneralSubjectService.Add(
                new EducationalProfileGeneralSubject()
                {
                    SubjectId = request.SubjectId,
                    EducationalProfileId = request.ProfileId,
                    PerWeek = request.PerWeek,
                    Year = request.Year,
                }
            );

            return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
        }
        else
        {
            var result = await createVocationalSubjectService.Add(
                new EducationalProfileVocationalSubject()
                {
                    SubjectId = request.SubjectId,
                    EducationalProfileId = request.ProfileId,
                    PerWeek = request.PerWeek,
                    Year = request.Year,
                }
            );

            return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
        }
    }

    public async Task<Result> RemoveSubject(RemoveSubjectRequestDto request)
    {
        if (request.Type == AddSubjectRequestDto.SubjectType.General)
        {
            var result = await deleteGeneralSubjectService.Delete(x =>
                x.SubjectId == request.SubjectId && x.EducationalProfileId == request.ProfileId
            );

            return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
        }
        else
        {
            var result = await deleteVocationalSubjectService.Delete(x =>
                x.SubjectId == request.SubjectId && x.EducationalProfileId == request.ProfileId
            );

            return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
        }
    }

    public async Task<Result> UpdateSubject(UpdateProfileSubjectRequestDto request)
    {
        if (request.CurrentType == request.NewType)
        {
            if (request.CurrentType == AddSubjectRequestDto.SubjectType.General)
            {
                return await updateGeneralSubject.Update(
                    x =>
                        x.SubjectId == request.SubjectId
                        && x.EducationalProfileId == request.ProfileId,
                    x =>
                        x.SetProperty(x => x.PerWeek, request.NewPerWeek)
                            .SetProperty(x => x.Year, request.NewYear)
                );
            }
            else
            {
                return await updateVocationalSubject.Update(
                    x =>
                        x.SubjectId == request.SubjectId
                        && x.EducationalProfileId == request.ProfileId,
                    x =>
                        x.SetProperty(x => x.PerWeek, request.NewPerWeek)
                            .SetProperty(x => x.Year, request.NewYear)
                );
            }
        }

        var result = await RemoveSubject(
            new RemoveSubjectRequestDto()
            {
                ProfileId = request.ProfileId,
                SubjectId = request.SubjectId,
                Type = request.CurrentType,
            }
        );

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        return await AddSubject(
            new AddSubjectRequestDto()
            {
                ProfileId = request.ProfileId,
                SubjectId = request.SubjectId,
                PerWeek = request.NewPerWeek,
                Year = request.NewYear,
                Type = request.NewType,
            }
        );
    }
}
