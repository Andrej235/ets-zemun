using EtsZemun.Services.Model.TeacherService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.TeacherController;

[Route("teacher")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class TeacherController(ITeacherService teacherService) : ControllerBase;
