using EtsZemun.DTOs.Request.Language;
using EtsZemun.DTOs.Response.Language;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.LanguageService;

public interface ILanguageService
{
    Task<Result<Language>> Create(CreateLanguageRequestDto request);
    Task<Result<IEnumerable<LanguageResponseDto>>> GetAll();
    Task<Result> Update(UpdateLanguageRequestDto request);
    Task<Result> Delete(string code);
}
