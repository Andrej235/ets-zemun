using EtsZemun.Services.Model.ExamService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.ExamController;

[Route("exams")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class ExamController(IExamService examService) : ControllerBase;
