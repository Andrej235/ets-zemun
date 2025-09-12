using FluentResults;

namespace EtsZemun.Services.Model.EducationalProfileService;

public partial class EducationalProfileService
{
    public Task<Result> Delete(int id)
    {
        return deleteService.Delete(x => x.Id == id);
    }
}
