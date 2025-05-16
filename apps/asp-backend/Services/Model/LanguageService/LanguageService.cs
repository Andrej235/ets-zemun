using EtsZemun.Dtos.Request.Language;
using EtsZemun.Dtos.Response.Language;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using FluentResults;

namespace EtsZemun.Services.Model.LanguageService;

public partial class LanguageService(
    ICreateSingleService<Language> createSingleService,
    IReadRangeSelectedService<Language> readRangeService,
    IExecuteUpdateService<Language> updateService,
    IDeleteService<Language> deleteService,
    IRequestMapper<CreateLanguageRequestDto, Language> createMapper
) : ILanguageService
{
    private readonly ICreateSingleService<Language> createSingleService = createSingleService;
    private readonly IReadRangeSelectedService<Language> readRangeService = readRangeService;
    private readonly IExecuteUpdateService<Language> updateService = updateService;
    private readonly IDeleteService<Language> deleteServic = deleteService;
    private readonly IRequestMapper<CreateLanguageRequestDto, Language> createMapper = createMapper;

    public Task<Result<Language>> Create(CreateLanguageRequestDto request) =>
        createSingleService.Add(createMapper.Map(request));

    public Task<Result> Delete(string code) => deleteServic.Delete(x => x.Code == code);

    public Task<Result<IEnumerable<LanguageResponseDto>>> GetAll() =>
        readRangeService.Get(
            x => new LanguageResponseDto { Code = x.Code, FullName = x.FullName },
            null
        );

    public Task<Result> Update(UpdateLanguageRequestDto request)
    {
        return updateService.Update(
            x => x.Code == request.OldCode,
            x =>
                x.SetProperty(x => x.Code, request.NewCode)
                    .SetProperty(x => x.FullName, request.FullName)
        );
    }
}
