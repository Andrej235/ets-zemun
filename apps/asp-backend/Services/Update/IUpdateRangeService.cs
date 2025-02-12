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
        Task Update(IEnumerable<TEntity> updatedEntities);
    }
}
