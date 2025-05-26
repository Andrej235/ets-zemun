using EtsZemun.Services.Model.NewsService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.NewsController;

[ApiController]
[Route("news")]
public partial class NewsController(INewsService newsService) : ControllerBase;
