using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Services.Model.SubjectService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.SubjectController;

[Route("subject")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class SubjectController(ISubjectService subjectService) : ControllerBase;
