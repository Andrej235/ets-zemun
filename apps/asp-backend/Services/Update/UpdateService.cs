using System.Linq.Expressions;
using EtsZemun.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace EtsZemun.Services.Update
{
    public class UpdateService<T>(DataContext context)
        : IUpdateSingleService<T>,
            IUpdateRangeService<T>,
            IExecuteUpdateService<T>
        where T : class
    {
        public async Task Update(T updatedEntity)
        {
            try
            {
                _ = context.Set<T>().Update(updatedEntity);
                _ = await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update", ex);
            }
        }

        public async Task Update(IEnumerable<T> updatedEntities)
        {
            try
            {
                context.Set<T>().UpdateRange(updatedEntities);
                _ = await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update", ex);
            }
        }

        public async Task Update(
            Expression<Func<T, bool>> updateCriteria,
            Expression<Func<SetPropertyCalls<T>, SetPropertyCalls<T>>> setPropertyCalls
        ) => await context.Set<T>().Where(updateCriteria).ExecuteUpdateAsync(setPropertyCalls);
    }
}
