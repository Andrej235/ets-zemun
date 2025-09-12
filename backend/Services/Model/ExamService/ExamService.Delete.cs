using FluentResults;

namespace EtsZemun.Services.Model.ExamService;

public partial class ExamService
{
    public Task<Result> Delete(int id)
    {
        return deleteService.Delete(x => x.Id == id);
    }

    public Task<Result> DeleteAll()
    {
        return deleteService.Delete(x => true);
    }
}
