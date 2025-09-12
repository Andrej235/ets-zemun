using EtsZemun.Services.Model.CaptionService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.CaptionController;

[Route("captions")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class CaptionController(ICaptionService captionService) : ControllerBase;
