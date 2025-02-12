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
        /// <returns>
        /// A <see cref="Result"/> where: <br/>
        /// - <see cref="Result.IsSuccess"/> is `true` <br/>
        /// - <see cref="Result.IsFailed"/> is `true` with one of the following errors: <br/>
        ///   - <see cref="Errors.BadRequest"/> (HTTP 400): If the request fails database validation (e.g., missing Name).
        /// </returns>
        Task<Result> Add(IEnumerable<TEntity> toAdd);
    }
}
