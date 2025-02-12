using EtsZemun.Data;
using EtsZemun.Errors;
using FluentResults;

namespace EtsZemun.Services.Create
{
    public class CreateService<T>(DataContext context, ILogger<CreateService<T>> logger)
        : ICreateSingleService<T>,
            ICreateRangeService<T>
        where T : class
    {
        private readonly DataContext context = context;
        private readonly ILogger<CreateService<T>> logger = logger;
        const string FAILED_TO_CREATE_MESSAGE = "Failed to create entity";

        public async Task<Result<T>> Add(T toAdd)
        {
            try
            {
                _ = await context.Set<T>().AddAsync(toAdd);
                _ = await context.SaveChangesAsync();

                return toAdd;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, FAILED_TO_CREATE_MESSAGE);
                return Result.Fail(new FailedToCreateEntity(FAILED_TO_CREATE_MESSAGE));
            }
        }

        public async Task<Result> Add(IEnumerable<T> toAdd)
        {
            try
            {
                List<T> toAddList = toAdd.ToList();
                await context.Set<T>().AddRangeAsync(toAddList);
                _ = await context.SaveChangesAsync();
                return Result.Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, FAILED_TO_CREATE_MESSAGE);
                return Result.Fail(new FailedToCreateEntity(FAILED_TO_CREATE_MESSAGE));
            }
        }
    }
}
