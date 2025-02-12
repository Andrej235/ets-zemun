using FluentResults;

namespace EtsZemun.Services.Update
{
    public interface IUpdateRangeService<in TEntity>
        where TEntity : class
    {
        /// <summary>
        /// Updates the provided entities in the database
        /// <br />Each provided entity MUST be of type <typeparamref name="TEntity"/> and have the same primary key as the entity in the database
        /// <br /> <br />
        /// If you want to update entities without having references to them, use <see cref="IExecuteUpdateService{T}.Update"/>
        /// </summary>
        /// <param name="updatedEntities">Entities to update</param>
        /// <exception cref="BadRequestException"/>
        /// <returns>
        /// A <see cref="Result"/> where: <br/>
        /// - <see cref="Result.IsSuccess"/> is `true` <br/>
        /// - <see cref="Result.IsFailed"/> is `true` with one of the following errors: <br/>
        ///   - <see cref="Errors.BadRequest"/> (HTTP 400): If at least one of the updated entities fails database validation (e.g., missing Name).
        /// </returns>
        Task<Result> Update(IEnumerable<TEntity> updatedEntities);
    }
}
