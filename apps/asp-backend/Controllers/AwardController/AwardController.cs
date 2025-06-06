using EtsZemun.Services.Model.AwardService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.AwardController;

[Route("awards")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class AwardController(IAwardService awardService) : ControllerBase;
