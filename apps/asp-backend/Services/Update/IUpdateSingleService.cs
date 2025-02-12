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
        /// <exception cref="BadRequestException"/>
        Task Update(TEntity updatedEntity);
    }
}
