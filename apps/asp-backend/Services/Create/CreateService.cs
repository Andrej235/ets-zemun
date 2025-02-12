using EtsZemun.Data;
using EtsZemun.Exceptions;

namespace EtsZemun.Services.Create
{
    public class CreateService<T>(DataContext context, ILogger<CreateService<T>> logger)
        : ICreateSingleService<T>,
            ICreateRangeService<T>
        where T : class
    {
        private readonly DataContext context = context;
        private readonly ILogger<CreateService<T>> logger = logger;

        public async Task<T> Add(T toAdd)
        {
            try
            {
                _ = await context.Set<T>().AddAsync(toAdd);
                _ = await context.SaveChangesAsync();

                return toAdd;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to create entity");
                throw new Exception("Failed to create entity", ex);
            }
        }

        public async Task Add(IEnumerable<T> toAdd)
        {
            try
            {
                List<T> toAddList = toAdd.ToList();
                await context.Set<T>().AddRangeAsync(toAddList);
                _ = await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to create entity");
                throw new Exception("Failed to create entity", ex);
            }
        }
    }
}
