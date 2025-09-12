using EtsZemun.Services.Model.QualificationService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.QualificationController;

[Route("qualifications")]
[ApiController]
[ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
public partial class QualificationController(IQualificationService qualificationService)
    : ControllerBase;
