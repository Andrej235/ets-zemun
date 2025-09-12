using EtsZemun.Services.Model.EducationalProfileService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.EducationalProfilesController;

[Route("profiles")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class EducationalProfilesController(IEducationalProfileService profileService)
    : ControllerBase;
