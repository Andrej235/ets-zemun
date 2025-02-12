using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace EtsZemun.Services.Update
{
    public interface IExecuteUpdateService<TEntity>
        where TEntity : class
    {
        /// <summary>
        /// Updates all entities which match the <paramref name="updateCriteria"/> according to <paramref name="setPropertyCalls"/>
        /// <br /> <br />
        /// If you want to update entities you have a reference to, use:
        /// <br /><see cref="IUpdateSingleService{T}.Update(T)"/> to update a single entity
        /// <br /><see cref="IUpdateRangeService{T}.Update(IEnumerable{T})"/> to update a single entity
        /// </summary>
        /// <param name="updateCriteria">The criteria to update</param>
        /// <param name="setPropertyCalls">The property calls to set in the database</param>
        Task Update(
            Expression<Func<TEntity, bool>> updateCriteria,
            Expression<Func<SetPropertyCalls<TEntity>, SetPropertyCalls<TEntity>>> setPropertyCalls
        );
    }
}
