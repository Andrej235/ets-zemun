using EtsZemun.Data;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using Microsoft.AspNetCore.Identity;

namespace EtsZemun.Services.ModelServices.UserService;

public partial class UserService(
    UserManager<User> userManager,
    DataContext context,
    ICreateSingleService<UserLoginEvent> createLoginEventService,
    IHttpContextAccessor httpContextAccessor,
    IDeleteService<User> deleteService,
    ILogger<UserService> logger,
    IEmailSender<User> emailSender,
    IConfiguration configuration
) : IUserService;
