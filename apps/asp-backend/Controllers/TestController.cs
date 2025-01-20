using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers
{
    [Route("test")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(
                $"Currently running in {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}"
            );
        }
    }
}
