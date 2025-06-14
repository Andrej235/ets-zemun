using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using brevo_csharp.Client;
using EtsZemun.Data;
using EtsZemun.Dtos.Request.Award;
using EtsZemun.Dtos.Request.Caption;
using EtsZemun.Dtos.Request.EducationalProfile;
using EtsZemun.Dtos.Request.Exam;
using EtsZemun.Dtos.Request.Language;
using EtsZemun.Dtos.Request.News;
using EtsZemun.Dtos.Request.Qualification;
using EtsZemun.Dtos.Request.Subject;
using EtsZemun.Dtos.Request.Teacher;
using EtsZemun.Dtos.Response.Award;
using EtsZemun.Dtos.Response.EducationalProfile;
using EtsZemun.Dtos.Response.Exam;
using EtsZemun.Dtos.Response.News;
using EtsZemun.Dtos.Response.Qualification;
using EtsZemun.Dtos.Response.Subject;
using EtsZemun.Dtos.Response.Teacher;
using EtsZemun.Exceptions;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.EmailSender;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Request.AwardMappers;
using EtsZemun.Services.Mapping.Request.CaptionMappers;
using EtsZemun.Services.Mapping.Request.EducationalProfileMappers;
using EtsZemun.Services.Mapping.Request.ExamMappers;
using EtsZemun.Services.Mapping.Request.LanguageMappers;
using EtsZemun.Services.Mapping.Request.NewsMappers;
using EtsZemun.Services.Mapping.Request.QualificationMappers;
using EtsZemun.Services.Mapping.Request.SubjectMappers;
using EtsZemun.Services.Mapping.Request.TeacherMappers;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Mapping.Response.AwardMappers;
using EtsZemun.Services.Mapping.Response.EducationalProfileMappers;
using EtsZemun.Services.Mapping.Response.ExamMappers;
using EtsZemun.Services.Mapping.Response.NewsMappers;
using EtsZemun.Services.Mapping.Response.QualificationMappers;
using EtsZemun.Services.Mapping.Response.SubjectMappers;
using EtsZemun.Services.Mapping.Response.TeacherMappers;
using EtsZemun.Services.Model.AdminService;
using EtsZemun.Services.Model.AwardService;
using EtsZemun.Services.Model.CaptionService;
using EtsZemun.Services.Model.EducationalProfileService;
using EtsZemun.Services.Model.ExamService;
using EtsZemun.Services.Model.LanguageService;
using EtsZemun.Services.Model.NewsService;
using EtsZemun.Services.Model.QualificationService;
using EtsZemun.Services.Model.SubjectService;
using EtsZemun.Services.Model.TeacherService;
using EtsZemun.Services.Model.UserService;
using EtsZemun.Services.ModelServices.UserService;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using EtsZemun.Utilities;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

if (File.Exists("./secrets.json"))
    builder.Configuration.AddJsonFile("./secrets.json");

var env = builder.Environment;
var keysPath = Path.Combine(env.ContentRootPath, "keys");
Directory.CreateDirectory(keysPath);

builder
    .Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(keysPath))
    .SetApplicationName("EtsZemun");

var configuration = builder.Configuration;
builder.Services.AddSingleton(configuration);
Configuration.Default.ApiKey.Add("api-key", configuration["Brevo:ApiKey"]);

builder.Logging.ClearProviders().AddConsole();
builder.Services.AddExceptionHandler<ExceptionHandler>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SupportNonNullableReferenceTypes();
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.SerializerOptions.RespectNullableAnnotations = true;
});

builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.RespectNullableAnnotations = true;
    });
builder.Services.AddHybridCache();

var connectionString = configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
    throw new MissingConfigException("Connection string is null or empty");

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(connectionString);

    if (builder.Environment.IsDevelopment())
        options.EnableSensitiveDataLogging();
});

builder
    .Services.AddIdentity<User, IdentityRole>(options =>
    {
        options.Password.RequireUppercase = false;
    })
    .AddEntityFrameworkStores<DataContext>()
    .AddApiEndpoints()
    .AddDefaultTokenProviders();

builder.Services.AddTransient<IEmailSender<User>, EmailSender>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromDays(1);
    options.SlidingExpiration = true;

    if (env.IsDevelopment())
    {
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
        options.Cookie.SameSite = SameSiteMode.Lax;
    }
    else
    {
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.None;
        options.Cookie.Domain = ".ets-zemun.edu.rs";
    }

    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});

var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>();
if (allowedOrigins is null || allowedOrigins.Length == 0)
    throw new MissingConfigException("AllowedOrigins is null or empty");

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "WebsitePolicy",
        policyBuilder =>
        {
            policyBuilder
                .WithOrigins(allowedOrigins)
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
        }
    );
});

#region Model Services

builder.Services.AddScoped<IAdminService, AdminService>();

#region Language
builder.Services.AddScoped<ILanguageService, LanguageService>();
builder.Services.AddScoped<ICreateSingleService<Language>, CreateService<Language>>();
builder.Services.AddScoped<IReadRangeSelectedService<Language>, ReadService<Language>>();
builder.Services.AddScoped<ICountService<Language>, ReadService<Language>>();
builder.Services.AddScoped<IExecuteUpdateService<Language>, UpdateService<Language>>();
builder.Services.AddScoped<IDeleteService<Language>, DeleteService<Language>>();
builder.Services.AddScoped<
    IRequestMapper<CreateLanguageRequestDto, Language>,
    CreateLanguageRequestMapper
>();
#endregion

#region Subject
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<ICreateSingleService<Subject>, CreateService<Subject>>();
builder.Services.AddScoped<
    ICreateSingleService<SubjectTranslation>,
    CreateService<SubjectTranslation>
>();
builder.Services.AddScoped<
    ICreateRangeService<SubjectTranslation>,
    CreateService<SubjectTranslation>
>();
builder.Services.AddScoped<IReadSingleService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<IReadSingleSelectedService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<IReadRangeService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<IReadRangeSelectedService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<ICountService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<
    IUpdateRangeService<SubjectTranslation>,
    UpdateService<SubjectTranslation>
>();
builder.Services.AddScoped<
    IExecuteUpdateService<SubjectTranslation>,
    UpdateService<SubjectTranslation>
>();
builder.Services.AddScoped<IDeleteService<Subject>, DeleteService<Subject>>();
builder.Services.AddScoped<IDeleteService<SubjectTranslation>, DeleteService<SubjectTranslation>>();
builder.Services.AddScoped<
    IRequestMapper<CreateSubjectTranslationRequestDto, SubjectTranslation>,
    CreateSubjectTranslationRequestMapper
>();
builder.Services.AddScoped<
    IResponseMapper<Subject, SimpleSubjectResponseDto>,
    SimpleSubjectResponseMapper
>();
builder.Services.AddScoped<IResponseMapper<Subject, SubjectResponseDto>, SubjectResponseMapper>();
#endregion

#region Teacher
builder.Services.AddScoped<ITeacherService, TeacherService>();
builder.Services.AddScoped<ICreateSingleService<Teacher>, CreateService<Teacher>>();
builder.Services.AddScoped<
    ICreateSingleService<TeacherTranslation>,
    CreateService<TeacherTranslation>
>();
builder.Services.AddScoped<IReadSingleService<Teacher>, ReadService<Teacher>>();
builder.Services.AddScoped<IReadSingleSelectedService<Teacher>, ReadService<Teacher>>();
builder.Services.AddScoped<IReadRangeService<Teacher>, ReadService<Teacher>>();
builder.Services.AddScoped<IReadRangeSelectedService<Teacher>, ReadService<Teacher>>();
builder.Services.AddScoped<ICountService<Teacher>, ReadService<Teacher>>();
builder.Services.AddScoped<IUpdateSingleService<Teacher>, UpdateService<Teacher>>();
builder.Services.AddScoped<
    IExecuteUpdateService<TeacherTranslation>,
    UpdateService<TeacherTranslation>
>();
builder.Services.AddScoped<IDeleteService<Teacher>, DeleteService<Teacher>>();
builder.Services.AddScoped<IDeleteService<TeacherTranslation>, DeleteService<TeacherTranslation>>();
builder.Services.AddScoped<
    IRequestMapper<CreateTeacherRequestDto, Teacher>,
    CreateTeacherRequestMapper
>();
builder.Services.AddScoped<
    IRequestMapper<CreateTeacherTranslationRequestDto, TeacherTranslation>,
    CreateTeacherTranslationRequestMapper
>();
builder.Services.AddScoped<IResponseMapper<Teacher, TeacherResponseDto>, TeacherResponseMapper>();
builder.Services.AddScoped<
    IResponseMapper<Teacher, SimpleTeacherResponseDto>,
    SimpleTeacherResponseMapper
>();
#endregion

#region Teacher subject
builder.Services.AddScoped<ICreateRangeService<TeacherSubject>, CreateService<TeacherSubject>>();
builder.Services.AddScoped<IDeleteService<TeacherSubject>, DeleteService<TeacherSubject>>();
#endregion

#region Qualification
builder.Services.AddScoped<IQualificationService, QualificationService>();
builder.Services.AddScoped<ICreateSingleService<Qualification>, CreateService<Qualification>>();
builder.Services.AddScoped<
    ICreateSingleService<QualificationTranslation>,
    CreateService<QualificationTranslation>
>();
builder.Services.AddScoped<IReadSingleService<Qualification>, ReadService<Qualification>>();
builder.Services.AddScoped<IReadRangeService<Qualification>, ReadService<Qualification>>();
builder.Services.AddScoped<ICountService<Qualification>, ReadService<Qualification>>();
builder.Services.AddScoped<IExecuteUpdateService<Qualification>, UpdateService<Qualification>>();
builder.Services.AddScoped<
    IExecuteUpdateService<QualificationTranslation>,
    UpdateService<QualificationTranslation>
>();
builder.Services.AddScoped<
    IUpdateRangeService<QualificationTranslation>,
    UpdateService<QualificationTranslation>
>();
builder.Services.AddScoped<IDeleteService<Qualification>, DeleteService<Qualification>>();
builder.Services.AddScoped<
    IDeleteService<QualificationTranslation>,
    DeleteService<QualificationTranslation>
>();
builder.Services.AddScoped<
    IRequestMapper<CreateQualificationRequestDto, Qualification>,
    CreateQualificationRequestMapper
>();
builder.Services.AddScoped<
    IRequestMapper<CreateQualificationTranslationRequestDto, QualificationTranslation>,
    CreateQualificationTranslationRequestMapper
>();
builder.Services.AddScoped<
    IResponseMapper<Qualification, QualificationResponseDto>,
    QualificationResponseMapper
>();
#endregion

#region Educational Profiles
builder.Services.AddScoped<IEducationalProfileService, EducationalProfileService>();
builder.Services.AddScoped<
    ICreateSingleService<EducationalProfile>,
    CreateService<EducationalProfile>
>();
builder.Services.AddScoped<
    ICreateSingleService<EducationalProfileGeneralSubject>,
    CreateService<EducationalProfileGeneralSubject>
>();
builder.Services.AddScoped<
    ICreateSingleService<EducationalProfileVocationalSubject>,
    CreateService<EducationalProfileVocationalSubject>
>();
builder.Services.AddScoped<
    IReadRangeSelectedService<EducationalProfile>,
    ReadService<EducationalProfile>
>();
builder.Services.AddScoped<
    IReadSingleService<EducationalProfile>,
    ReadService<EducationalProfile>
>();
builder.Services.AddScoped<ICountService<EducationalProfile>, ReadService<EducationalProfile>>();
builder.Services.AddScoped<
    IExecuteUpdateService<EducationalProfileGeneralSubject>,
    UpdateService<EducationalProfileGeneralSubject>
>();
builder.Services.AddScoped<
    IExecuteUpdateService<EducationalProfileVocationalSubject>,
    UpdateService<EducationalProfileVocationalSubject>
>();
builder.Services.AddScoped<
    IUpdateSingleService<EducationalProfile>,
    UpdateService<EducationalProfile>
>();
builder.Services.AddScoped<
    IExecuteUpdateService<EducationalProfile>,
    UpdateService<EducationalProfile>
>();
builder.Services.AddScoped<IDeleteService<EducationalProfile>, DeleteService<EducationalProfile>>();
builder.Services.AddScoped<
    IDeleteService<EducationalProfileGeneralSubject>,
    DeleteService<EducationalProfileGeneralSubject>
>();
builder.Services.AddScoped<
    IDeleteService<EducationalProfileVocationalSubject>,
    DeleteService<EducationalProfileVocationalSubject>
>();
builder.Services.AddScoped<
    IRequestMapper<UpdateEducationalProfileRequestDto, EducationalProfile>,
    UpdateEducationalProfileRequestMapper
>();
builder.Services.AddScoped<
    IResponseMapper<EducationalProfile, EducationalProfileResponseDto>,
    EducationalProfileResponseMapper
>();
builder.Services.AddScoped<
    IRequestMapper<CreateProfileSubjectRequestDto, EducationalProfileGeneralSubject>,
    ProfileGeneralSubjectRequestMapper
>();
builder.Services.AddScoped<
    IRequestMapper<CreateProfileSubjectRequestDto, EducationalProfileVocationalSubject>,
    ProfileVocationalSubjectRequestMapper
>();
builder.Services.AddScoped<
    IResponseMapper<EducationalProfileGeneralSubject, ProfileSubjectResponseDto>,
    ProfileGeneralSubjectResponseMapper
>();
builder.Services.AddScoped<
    IResponseMapper<EducationalProfileVocationalSubject, ProfileSubjectResponseDto>,
    ProfileVocationalSubjectResponseMapper
>();
#endregion

#region Award
builder.Services.AddScoped<IAwardService, AwardService>();
builder.Services.AddScoped<ICreateSingleService<Award>, CreateService<Award>>();
builder.Services.AddScoped<
    ICreateSingleService<AwardTranslation>,
    CreateService<AwardTranslation>
>();
builder.Services.AddScoped<IReadSingleService<Award>, ReadService<Award>>();
builder.Services.AddScoped<IReadSingleSelectedService<Award>, ReadService<Award>>();
builder.Services.AddScoped<IReadRangeService<Award>, ReadService<Award>>();
builder.Services.AddScoped<IReadRangeSelectedService<Award>, ReadService<Award>>();
builder.Services.AddScoped<ICountService<Award>, ReadService<Award>>();
builder.Services.AddScoped<IUpdateSingleService<Award>, UpdateService<Award>>();
builder.Services.AddScoped<
    IUpdateSingleService<AwardTranslation>,
    UpdateService<AwardTranslation>
>();
builder.Services.AddScoped<
    IUpdateRangeService<AwardTranslation>,
    UpdateService<AwardTranslation>
>();
builder.Services.AddScoped<IDeleteService<Award>, DeleteService<Award>>();
builder.Services.AddScoped<IDeleteService<AwardTranslation>, DeleteService<AwardTranslation>>();
builder.Services.AddScoped<
    IRequestMapper<CreateAwardRequestDto, Award>,
    CreateAwardRequestMapper
>();
builder.Services.AddScoped<
    IRequestMapper<UpdateAwardRequestDto, Award>,
    UpdateAwardRequestMapper
>();
builder.Services.AddScoped<
    IRequestMapper<CreateAwardTranslationRequestDto, AwardTranslation>,
    CreateAwardTranslationRequestMapper
>();
builder.Services.AddScoped<
    IRequestMapper<UpdateAwardTranslationRequestDto, AwardTranslation>,
    UpdateAwardTranslationRequestMapper
>();
builder.Services.AddScoped<IResponseMapper<Award, AwardResponseDto>, AwardResponseMapper>();
#endregion

#region News
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<ICreateSingleService<News>, CreateService<News>>();
builder.Services.AddScoped<ICreateSingleService<NewsTranslation>, CreateService<NewsTranslation>>();
builder.Services.AddScoped<IReadRangeService<News>, ReadService<News>>();
builder.Services.AddScoped<IReadRangeSelectedService<News>, ReadService<News>>();
builder.Services.AddScoped<IReadSingleService<News>, ReadService<News>>();
builder.Services.AddScoped<IReadSingleSelectedService<News>, ReadService<News>>();
builder.Services.AddScoped<ICountService<News>, ReadService<News>>();
builder.Services.AddScoped<IUpdateRangeService<NewsTranslation>, UpdateService<NewsTranslation>>();
builder.Services.AddScoped<IExecuteUpdateService<News>, UpdateService<News>>();
builder.Services.AddScoped<
    IExecuteUpdateService<NewsTranslation>,
    UpdateService<NewsTranslation>
>();
builder.Services.AddScoped<IDeleteService<News>, DeleteService<News>>();
builder.Services.AddScoped<IDeleteService<NewsTranslation>, DeleteService<NewsTranslation>>();
builder.Services.AddScoped<IRequestMapper<CreateNewsRequestDto, News>, CreateNewsRequestMapper>();
builder.Services.AddScoped<
    IRequestMapper<CreateNewsTranslationRequestDto, NewsTranslation>,
    CreateNewsTranslationRequestMapper
>();
builder.Services.AddScoped<
    IResponseMapper<News, NewsPreviewResponseDto>,
    NewsPreviewResponseMapper
>();
builder.Services.AddScoped<IResponseMapper<News, NewsResponseDto>, NewsResponseMapper>();
#endregion

#region User
builder.Services.AddScoped<SignInManager>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICountService<User>, ReadService<User>>();
builder.Services.AddScoped<
    ICountService<IdentityUserRole<string>>,
    ReadService<IdentityUserRole<string>>
>();
builder.Services.AddScoped<IDeleteService<User>, DeleteService<User>>();

builder.Services.AddScoped<ICreateSingleService<UserLoginEvent>, CreateService<UserLoginEvent>>();
#endregion

#region Exam
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<ICreateSingleService<Exam>, CreateService<Exam>>();
builder.Services.AddScoped<
    ICreateRangeService<ExamCommissionMember>,
    CreateService<ExamCommissionMember>
>();
builder.Services.AddScoped<IReadSingleService<Exam>, ReadService<Exam>>();
builder.Services.AddScoped<IReadRangeService<Exam>, ReadService<Exam>>();
builder.Services.AddScoped<IExecuteUpdateService<Exam>, UpdateService<Exam>>();
builder.Services.AddScoped<IDeleteService<Exam>, DeleteService<Exam>>();
builder.Services.AddScoped<
    IDeleteService<ExamCommissionMember>,
    DeleteService<ExamCommissionMember>
>();
builder.Services.AddScoped<IRequestMapper<CreateExamRequestDto, Exam>, CreateExamRequestMapper>();
builder.Services.AddScoped<IResponseMapper<Exam, ExamResponseDto>, ExamResponseMapper>();
#endregion

#region Captions
builder.Services.AddScoped<ICaptionService, CaptionService>();
builder.Services.AddScoped<ICreateSingleService<Caption>, CreateService<Caption>>();
builder.Services.AddScoped<
    ICreateSingleService<CaptionTranslation>,
    CreateService<CaptionTranslation>
>();
builder.Services.AddScoped<IReadRangeSelectedService<Caption>, ReadService<Caption>>();
builder.Services.AddScoped<IReadSingleSelectedService<Caption>, ReadService<Caption>>();
builder.Services.AddScoped<IExecuteUpdateService<Caption>, UpdateService<Caption>>();
builder.Services.AddScoped<
    IUpdateRangeService<CaptionTranslation>,
    UpdateService<CaptionTranslation>
>();
builder.Services.AddScoped<IDeleteService<Caption>, DeleteService<Caption>>();
builder.Services.AddScoped<
    IRequestMapper<CreateCaptionRequestDto, Caption>,
    CreateCaptionRequestMapper
>();
#endregion

#endregion

#region Rate limiting
builder.Services.AddRateLimiter(x =>
{
    x.AddTokenBucketLimiter(
        policyName: RateLimitingPolicies.Global,
        options =>
        {
            options.TokenLimit = 10;
            options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
            options.QueueLimit = 15;
            options.ReplenishmentPeriod = TimeSpan.FromSeconds(1);
            options.TokensPerPeriod = 2;
            options.AutoReplenishment = true;
        }
    );

    x.AddTokenBucketLimiter(
        policyName: RateLimitingPolicies.EmailConfirmation,
        options =>
        {
            options.TokenLimit = 1;
            options.QueueLimit = 0;
            options.ReplenishmentPeriod = TimeSpan.FromSeconds(60);
            options.TokensPerPeriod = 1;
            options.AutoReplenishment = true;
        }
    );
});

#endregion

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

    var roles = new[] { Roles.Admin, Roles.Mod, Roles.User };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new IdentityRole(role));
    }
}

app.UseRateLimiter();
app.UseExceptionHandler("/error");
app.UseCors("WebsitePolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers().RequireRateLimiting(RateLimitingPolicies.Global);

app.MapMethods("/", ["HEAD"], () => Results.Ok());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.RunAsync();
