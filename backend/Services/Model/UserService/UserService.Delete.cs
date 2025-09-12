using FluentResults;

namespace EtsZemun.Services.ModelServices.UserService;

public partial class UserService
{
    public Task<Result> Delete(string id) => deleteService.Delete(x => x.Id == id);
}
