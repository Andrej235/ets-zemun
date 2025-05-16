using EtsZemun.Models;
using EtsZemun.Services.ModelServices.UserService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EtsZemun.Controllers.UserController;

[Route("users")]
[ApiController]
public partial class UserController(IUserService userService, SignInManager<User> signInManager)
    : ControllerBase;
