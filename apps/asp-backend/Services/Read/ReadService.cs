using System.Linq.Expressions;
using EtsZemun.Data;
using EtsZemun.Errors;
using EtsZemun.Utilities;
using FluentResults;
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

        public async Task<Result<TEntity>> Get(
            Expression<Func<TEntity, bool>> criteria,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        )
        {
            var source = queryBuilder is null
                ? context.Set<TEntity>()
                : Unwrap(queryBuilder.Invoke(context.Set<TEntity>().Wrap()));

            var result = await (
                source?.FirstOrDefaultAsync(criteria) ?? Task.FromResult<TEntity?>(null)
            );

            return result is null ? Result.Fail(new NotFound("Entity not found")) : result;
        }

        public async Task<Result<IEnumerable<TEntity>>> Get(
            Expression<Func<TEntity, bool>>? criteria,
            int? offset = 0,
            int? limit = -1,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        )
        {
            if (queryBuilder is null)
                return criteria is null
                    ? await context.Set<TEntity>().ApplyOffsetAndLimit(offset, limit)
                    : await context
                        .Set<TEntity>()
                        .Where(criteria)
                        .ApplyOffsetAndLimit(offset, limit);

            IWrappedResult<TEntity> includeResult = queryBuilder.Invoke(
                context.Set<TEntity>().Wrap()
            );
            IQueryable<TEntity>? source = Unwrap(includeResult);

            if (source is null)
                return Result.Fail(new InternalError("Failed to unwrap query"));

            return criteria is null
                ? await source.ApplyOffsetAndLimit(offset, limit)
                : await source.Where(criteria).ApplyOffsetAndLimit(offset, limit);
        }

        public async Task<Result<IEnumerable<T>>> Get<T>(
            Expression<Func<TEntity, T>> select,
            Expression<Func<TEntity, bool>>? criteria,
            int? offset = 0,
            int? limit = -1,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        )
        {
            if (queryBuilder is null)
                return criteria is null
                    ? await context.Set<TEntity>().Select(select).ApplyOffsetAndLimit(offset, limit)
                    : await context
                        .Set<TEntity>()
                        .Where(criteria)
                        .Select(select)
                        .ApplyOffsetAndLimit(offset, limit);

            IWrappedResult<TEntity> query = queryBuilder.Invoke(context.Set<TEntity>().Wrap());
            IQueryable<TEntity>? source = Unwrap(query);

            if (source is null)
                return Result.Fail(new InternalError("Failed to unwrap query"));

            return criteria is null
                ? await source.Select(select).ApplyOffsetAndLimit(offset, limit)
                : await source.Where(criteria).Select(select).ApplyOffsetAndLimit(offset, limit);
        }

        public async Task<Result<T>> Get<T>(
            Expression<Func<TEntity, T>> select,
            Expression<Func<TEntity, bool>> criteria,
            Func<IWrappedQueryable<TEntity>, IWrappedResult<TEntity>>? queryBuilder = null
        )
        {
            IQueryable<TEntity>? source = queryBuilder is null
                ? context.Set<TEntity>()
                : Unwrap(queryBuilder.Invoke(context.Set<TEntity>().Wrap()));

            if (source is null)
                return Result.Fail(new InternalError("Failed to unwrap query"));

            var result = await source.Where(criteria).Select(select).FirstOrDefaultAsync();
            return result is null ? Result.Fail(new NotFound("Entity not found")) : result;
        }

        private static IQueryable<TEntity>? Unwrap(IWrappedResult<TEntity> source) =>
            (source as WrappedQueryable<TEntity>)?.Source
            ?? (source as WrappedOrderedQueryable<TEntity>)?.Source
            ?? null;
    }
}
