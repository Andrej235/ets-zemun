using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Data;

public class IdentityDataContext(DbContextOptions<IdentityDataContext> options)
    : IdentityDbContext<IdentityUser, IdentityRole, string>(options) { }
