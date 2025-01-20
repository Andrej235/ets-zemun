using EtsZemun.Data;
using EtsZemun.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EtsZemun.Controllers
{
    [Route("test")]
    [ApiController]
    public class TestController(DataContext context) : ControllerBase
    {
        private readonly DataContext context = context;

        [HttpGet("check-connection")]
        public IActionResult GetConnection()
        {
            return Ok(
                $"Currently running in {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}"
            );
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Test test)
        {
            await context.Tests.AddAsync(test);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await context.Tests.ToListAsync());
        }
    }
}
