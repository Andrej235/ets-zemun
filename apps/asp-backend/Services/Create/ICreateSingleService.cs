using FluentResults;

namespace EtsZemun.Services.Create
{
    public interface ICreateSingleService<TEntity>
        where TEntity : class
    {
        /// <summary>
        /// Adds entity to database
        /// </summary>
        /// <returns>Added entity with its new primary key</returns>
        /// <param name="toAdd">Entity to save in the database</param>
        /// <exception cref="Exceptions.FailedToCreateEntityException"/>
        Task<Result<TEntity>> Add(TEntity toAdd);
    }
}
