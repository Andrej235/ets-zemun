using System.Linq.Expressions;

namespace EtsZemun.Services.Read
{
    public interface IReadSingleService<TEntity>
        where TEntity : class
    {
        /// <summary>
        /// Finds the first entity in database which fits the <paramref name="criteria"/>
        /// </summary>
        /// <param name="criteria">Expression used to find the entity</param>
        /// <param name="queryBuilder">
        /// Used to further modify the query
        /// Allows 5 methods: Include, ThenInclude, OrderBy, OrderByDescending and AsNoTracking
        /// </param>
        /// <returns>First entity that fits the <paramref name="criteria"/> or if such entity doesn't exist, null</returns>
        Task<TEntity?> Get(
            Expression<Func<TEntity, bool>> criteria,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        );
    }
}
