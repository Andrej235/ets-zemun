using FluentResults;

namespace EtsZemun.Services.Model.CaptionService;

public partial class CaptionService
{
    public Task<Result> Delete(int id)
    {
        return deleteService.Delete(x => x.Id == id);
    }
}
