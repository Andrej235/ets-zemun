using FluentResults;

namespace EtsZemun.Services.Create
{
    public interface ICreateRangeService<in TEntity>
        where TEntity : class
    {
        /// <summary>
        /// Adds entities to database
        /// </summary>
        /// <param name="toAdd">Entities to save in the database</param>
        /// <exception cref="Exceptions.FailedToCreateEntityException"/>
        Task<Result> Add(IEnumerable<TEntity> toAdd);
    }
}
