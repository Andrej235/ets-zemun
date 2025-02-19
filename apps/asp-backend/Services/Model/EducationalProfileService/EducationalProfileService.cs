using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.DTOs.Response.EducationalProfile;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public class EducationalProfileService(
    ICreateSingleService<EducationalProfile> createSingle,
    IReadRangeService<EducationalProfile> readRangeService,
    IReadSingleService<EducationalProfile> readSingleService,
    IUpdateSingleService<EducationalProfile> updateSingle,
    IDeleteService<EducationalProfile> deleteService,
    IDeleteService<EducationalProfileGeneralSubject> deleteGeneralSubjectService,
    IDeleteService<EducationalProfileVocationalSubject> deleteVocationalSubjectService,
    IRequestMapper<CreateEducationalProfileRequestDto, EducationalProfile> createRequestMapper,
    IRequestMapper<UpdateEducationalProfileRequestDto, EducationalProfile> updateRequestMapper,
    IResponseMapper<EducationalProfile, EducationalProfileResponseDto> responseMapper
) : IEducationalProfileService
{
    private readonly ICreateSingleService<EducationalProfile> createSingle = createSingle;
    private readonly IReadRangeService<EducationalProfile> readRangeService = readRangeService;
    private readonly IReadSingleService<EducationalProfile> readSingleService = readSingleService;
    private readonly IUpdateSingleService<EducationalProfile> updateSingle = updateSingle;
    private readonly IDeleteService<EducationalProfile> deleteService = deleteService;
    private readonly IDeleteService<EducationalProfileGeneralSubject> deleteGeneralSubjectService =
        deleteGeneralSubjectService;
    private readonly IDeleteService<EducationalProfileVocationalSubject> deleteVocationalSubjectService =
        deleteVocationalSubjectService;
    private readonly IRequestMapper<
        CreateEducationalProfileRequestDto,
        EducationalProfile
    > createRequestMapper = createRequestMapper;
    private readonly IRequestMapper<
        UpdateEducationalProfileRequestDto,
        EducationalProfile
    > updateRequestMapper = updateRequestMapper;
    private readonly IResponseMapper<
        EducationalProfile,
        EducationalProfileResponseDto
    > responseMapper = responseMapper;

    public async Task<Result> Create(CreateEducationalProfileRequestDto request)
    {
        var result = await createSingle.Add(createRequestMapper.Map(request));
        return result.IsFailed ? Result.Fail(result.Errors) : Result.Ok();
    }

    public Task<Result> Delete(int id)
    {
        return deleteService.Delete(x => x.Id == id);
    }

    public async Task<Result<IEnumerable<EducationalProfileResponseDto>>> GetAll(
        string languageCode
    )
    {
        var result = await readRangeService.Get(
            null,
            null,
            null,
            q =>
                q.Include(x => x.GeneralSubjects)
                    .ThenInclude(x => x.Subject)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.VocationalSubjects)
                    .ThenInclude(x => x.Subject)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        return result.IsFailed
            ? Result.Fail<IEnumerable<EducationalProfileResponseDto>>(result.Errors)
            : Result.Ok(result.Value.Select(x => responseMapper.Map(x)));
    }

    public async Task<Result<EducationalProfileResponseDto>> GetSingle(int id, string languageCode)
    {
        var result = await readSingleService.Get(
            x => x.Id == id,
            q =>
                q.Include(x => x.GeneralSubjects)
                    .ThenInclude(x => x.Subject)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
                    .Include(x => x.VocationalSubjects)
                    .ThenInclude(x => x.Subject)
                    .ThenInclude(x => x.Translations.Where(t => t.LanguageCode == languageCode))
        );

        return result.IsFailed
            ? Result.Fail<EducationalProfileResponseDto>(result.Errors)
            : Result.Ok(responseMapper.Map(result.Value));
    }

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
}
