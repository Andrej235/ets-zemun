using EtsZemun.DTOs.Request.Language;
using EtsZemun.Models;
using FluentResults;

namespace EtsZemun.Services.Model.LanguageService;

public interface ILanguageService
{
    Task<Result<Language>> Create(CreateLanguageRequestDto request);
    Task<Result<IEnumerable<Language>>> GetAll();
    Task<Result> Delete(int id);
}
