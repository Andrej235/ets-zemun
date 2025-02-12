using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Utilities
{
    public static class EnumerableExtensions
    {
        public static Task<List<T>> ApplyOffsetAndLimit<T>(
            this IQueryable<T> queryable,
            int? offset = 0,
            int? limit = -1
        )
        {
            queryable = queryable.Skip(offset ?? 0);

            if (limit is >= 0)
                queryable = queryable.Take(limit ?? 0);

            return queryable.ToListAsync();
        }
    }
}
