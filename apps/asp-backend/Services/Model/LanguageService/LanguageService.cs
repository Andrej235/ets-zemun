using EtsZemun.DTOs.Request.Language;
using EtsZemun.DTOs.Response.Language;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Read;
using FluentResults;

namespace EtsZemun.Services.Model.LanguageService;

public partial class LanguageService(
    ICreateSingleService<Language> createSingleService,
    IReadRangeSelectedService<Language> readRangeService,
    IDeleteService<Language> deleteService,
    IRequestMapper<CreateLanguageRequestDto, Language> createMapper
) : ILanguageService
{
    private readonly ICreateSingleService<Language> createSingleService = createSingleService;
    private readonly IReadRangeSelectedService<Language> readRangeService = readRangeService;
    private readonly IDeleteService<Language> deleteServic = deleteService;
    private readonly IRequestMapper<CreateLanguageRequestDto, Language> createMapper = createMapper;

    public Task<Result<Language>> Create(CreateLanguageRequestDto request) =>
        createSingleService.Add(createMapper.Map(request));

    public Task<Result> Delete(int id) => deleteServic.Delete(x => x.Id == id);

    public Task<Result<IEnumerable<LanguageResponseDto>>> GetAll() =>
        readRangeService.Get(
            x => new LanguageResponseDto
            {
                Id = x.Id,
                Code = x.Code,
                FullName = x.FullName,
            },
            null
        );
}
