using System.Linq.Expressions;
using EtsZemun.Data;
using EtsZemun.Utilities;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Services.Read
{
    public class ReadService<TEntity>(DataContext context)
        : IReadSingleService<TEntity>,
            IReadRangeService<TEntity>,
            IReadSingleSelectedService<TEntity>,
            IReadRangeSelectedService<TEntity>
        where TEntity : class
    {
        private readonly DataContext context = context;

        public Task<TEntity?> Get(
            Expression<Func<TEntity, bool>> criteria,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        ) =>
            queryBuilder is null
                ? context.Set<TEntity>().FirstOrDefaultAsync(criteria)
                : Unwrap(queryBuilder.Invoke(context.Set<TEntity>().Wrap()))
                    ?.FirstOrDefaultAsync(criteria) ?? Task.FromResult<TEntity?>(null);

        public Task<IEnumerable<TEntity>> Get(
            Expression<Func<TEntity, bool>>? criteria,
            int? offset = 0,
            int? limit = -1,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        ) =>
            Task.Run(() =>
            {
                if (queryBuilder is null)
                    return criteria is null
                        ? context.Set<TEntity>().ApplyOffsetAndLimit(offset, limit)
                        : context.Set<TEntity>().Where(criteria).ApplyOffsetAndLimit(offset, limit);

                IWrappedResult<TEntity> includeResult = queryBuilder.Invoke(
                    context.Set<TEntity>().Wrap()
                );
                IQueryable<TEntity>? source = Unwrap(includeResult);

                if (source is null)
                    return [];

                return criteria is null
                    ? source.ApplyOffsetAndLimit(offset, limit)
                    : source.Where(criteria).ApplyOffsetAndLimit(offset, limit);
            });

        public Task<IEnumerable<T>> Get<T>(
            Expression<Func<TEntity, T>> select,
            Expression<Func<TEntity, bool>>? criteria,
            int? offset = 0,
            int? limit = -1,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        ) =>
            Task.Run(() =>
            {
                if (queryBuilder is null)
                    return criteria is null
                        ? context.Set<TEntity>().Select(select).ApplyOffsetAndLimit(offset, limit)
                        : context
                            .Set<TEntity>()
                            .Where(criteria)
                            .Select(select)
                            .ApplyOffsetAndLimit(offset, limit);

                IWrappedResult<TEntity> query = queryBuilder.Invoke(context.Set<TEntity>().Wrap());
                IQueryable<TEntity>? source = Unwrap(query);

                if (source is null)
                    return [];

                return criteria is null
                    ? source.Select(select).ApplyOffsetAndLimit(offset, limit)
                    : source.Where(criteria).Select(select).ApplyOffsetAndLimit(offset, limit);
            });

        public async Task<T?> Get<T>(
            Expression<Func<TEntity, T>> select,
            Expression<Func<TEntity, bool>> criteria,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        )
        {
            if (queryBuilder is null)
                return await context
                    .Set<TEntity>()
                    .Where(criteria)
                    .Select(select)
                    .FirstOrDefaultAsync();

            IWrappedResult<TEntity> query = queryBuilder.Invoke(context.Set<TEntity>().Wrap());
            IQueryable<TEntity>? source = Unwrap(query);

            if (source is null)
                return default;

            return await source.Where(criteria).Select(select).FirstOrDefaultAsync();
        }

        private static IQueryable<TEntity>? Unwrap(IWrappedResult<TEntity> source) =>
            (source as WrappedQueryable<TEntity>)?.Source
            ?? (source as WrappedOrderedQueryable<TEntity>)?.Source
            ?? null;
    }
}
