using EtsZemun.Services.Model.UserService;
using EtsZemun.Services.ModelServices.UserService;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.UserController;

[Route("users")]
[ApiController]
public partial class UserController(IUserService userService, SignInManager signInManager)
    : ControllerBase;
