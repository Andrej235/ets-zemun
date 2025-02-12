using FluentResults;

namespace EtsZemun.Services.Update
{
    public interface IUpdateSingleService<in TEntity>
        where TEntity : class
    {
        /// <summary>
        /// Updates the provided entity in the database
        /// <br />The provided entity MUST be of type <typeparamref name="TEntity"/> and have the same primary key as the entity in the database
        /// <br /> <br />
        /// If you want to update an entity without having a reference to it, use <see cref="IExecuteUpdateService{T}.Update"/>
        /// </summary>
        /// <param name="updatedEntity">Entity to update</param>
        /// <returns>
        /// A <see cref="Result"/> where: <br/>
        /// - <see cref="Result.IsSuccess"/> is `true` <br/>
        /// - <see cref="Result.IsFailed"/> is `true` with one of the following errors: <br/>
        ///   - <see cref="Errors.BadRequest"/> (HTTP 400): If the updated entity fails database validation (e.g., missing Name).
        /// </returns>
        Task<Result> Update(TEntity updatedEntity);
    }
}
