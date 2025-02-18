using System.Linq.Expressions;
using EtsZemun.Data;
using EtsZemun.Errors;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Services.Delete
{
    public class DeleteService<T>(DataContext context) : IDeleteService<T>
        where T : class
    {
        private readonly DataContext context = context;

        public async Task<Result> Delete(
            Expression<Func<T, bool>> deleteCriteria,
            bool validate = true
        )
        {
            int deletedCount = await context.Set<T>().Where(deleteCriteria).ExecuteDeleteAsync();
            if (validate && deletedCount == 0)
                return Result.Fail(new NotFound("Entity not found"));

            return Result.Ok();
        }
    }
}
