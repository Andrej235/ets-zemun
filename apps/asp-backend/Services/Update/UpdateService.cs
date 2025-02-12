using System.Linq.Expressions;
using EtsZemun.Data;
using EtsZemun.Errors;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace EtsZemun.Services.Update
{
    public class UpdateService<T>(DataContext context, ILogger<UpdateService<T>> logger)
        : IUpdateSingleService<T>,
            IUpdateRangeService<T>,
            IExecuteUpdateService<T>
        where T : class
    {
        const string FAILED_TO_UPDATE_MESSAGE = "Failed to update";

        private readonly DataContext context = context;
        private readonly ILogger<UpdateService<T>> logger = logger;

        public async Task<Result> Update(T updatedEntity)
        {
            try
            {
                _ = context.Set<T>().Update(updatedEntity);
                _ = await context.SaveChangesAsync();
                return Result.Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, FAILED_TO_UPDATE_MESSAGE);
                return Result.Fail(new BadRequest(FAILED_TO_UPDATE_MESSAGE));
            }
        }

        public async Task<Result> Update(IEnumerable<T> updatedEntities)
        {
            try
            {
                context.Set<T>().UpdateRange(updatedEntities);
                _ = await context.SaveChangesAsync();
                return Result.Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, FAILED_TO_UPDATE_MESSAGE);
                return Result.Fail(new BadRequest(FAILED_TO_UPDATE_MESSAGE));
            }
        }

        public async Task<Result> Update(
            Expression<Func<T, bool>> updateCriteria,
            Expression<Func<SetPropertyCalls<T>, SetPropertyCalls<T>>> setPropertyCalls,
            bool validate = true
        )
        {
            int updatedCount = await context
                .Set<T>()
                .Where(updateCriteria)
                .ExecuteUpdateAsync(setPropertyCalls);

            if (validate && updatedCount == 0)
                return Result.Fail(new NotFound("Entity not found"));

            return Result.Ok();
        }
    }
}
