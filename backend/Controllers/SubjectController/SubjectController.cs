using EtsZemun.Services.Model.SubjectService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.SubjectController;

[Route("subjects")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class SubjectController(ISubjectService subjectService) : ControllerBase;
