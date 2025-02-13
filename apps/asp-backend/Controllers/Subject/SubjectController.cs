using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.Subject;

[Route("api/subject")]
[ApiController]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public partial class SubjectController : ControllerBase { }
