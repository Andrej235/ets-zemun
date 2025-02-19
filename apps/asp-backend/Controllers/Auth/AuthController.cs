using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.Auth
{
    [Route("auth")]
    public class AuthController : Controller
    {
        [HttpGet("admin")]
        public async Task<IActionResult> Admin()
        {
            return Ok();
        }
    }
}
