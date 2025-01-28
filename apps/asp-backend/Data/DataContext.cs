using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options) { }
}
