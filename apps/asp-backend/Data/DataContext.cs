using EtsZemun.Models;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<Test> Tests { get; set; }
    }
}
