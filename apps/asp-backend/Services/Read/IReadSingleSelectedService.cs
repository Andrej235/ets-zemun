using System.Linq.Expressions;

namespace EtsZemun.Services.Read
{
    public interface IReadSingleSelectedService<TEntity>
        where TEntity : class
    {
        /// <summary>
        /// Finds the first entity in database which fits the <paramref name="criteria"/> and maps it according to <paramref name="select"/> on database level
        /// </summary>
        /// <typeparam name="T">Type of the mapped entity</typeparam>
        /// <param name="select">Expression used to map the entity to <typeparamref name="T"/> on database level</param>
        /// <param name="criteria">Expression used to find the entity</param>
        /// <param name="queryBuilder">
        /// Used to further modify the query
        /// Allows 5 methods: Include, ThenInclude, OrderBy, OrderByDescending and AsNoTracking
        /// </param>
        /// <returns>First entity that fits the <paramref name="criteria"/> mapped according to <paramref name="select"/>, or if such entity doesn't exist null</returns>
        Task<T?> Get<T>(
            Expression<Func<TEntity, T>> select,
            Expression<Func<TEntity, bool>> criteria,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        );
    }
}
