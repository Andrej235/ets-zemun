using EtsZemun.Data;
using EtsZemun.DTOs.Request.Award;
using EtsZemun.DTOs.Request.EducationalProfile;
using EtsZemun.DTOs.Request.Language;
using EtsZemun.DTOs.Request.News;
using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.DTOs.Request.Subject;
using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.DTOs.Response.Auth;
using EtsZemun.DTOs.Response.Award;
using EtsZemun.DTOs.Response.EducationalProfile;
using EtsZemun.DTOs.Response.News;
using EtsZemun.DTOs.Response.Qualification;
using EtsZemun.DTOs.Response.Subject;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Exceptions;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Request.AwardMappers;
using EtsZemun.Services.Mapping.Request.EducationalProfileMappers;
using EtsZemun.Services.Mapping.Request.LanguageMappers;
using EtsZemun.Services.Mapping.Request.NewsMappers;
using EtsZemun.Services.Mapping.Request.QualificationMappers;
using EtsZemun.Services.Mapping.Request.SubjectMappers;
using EtsZemun.Services.Mapping.Request.TeacherMappers;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Mapping.Response.AwardMappers;
using EtsZemun.Services.Mapping.Response.EducationalProfileMappers;
using EtsZemun.Services.Mapping.Response.NewsMappers;
using EtsZemun.Services.Mapping.Response.QualificationMappers;
using EtsZemun.Services.Mapping.Response.SubjectMappers;
using EtsZemun.Services.Mapping.Response.TeacherMappers;
using EtsZemun.Services.Mapping.Response.UserMappers;
using EtsZemun.Services.Model.AwardService;
using EtsZemun.Services.Model.EducationalProfileService;
using EtsZemun.Services.Model.LanguageService;
using EtsZemun.Services.Model.NewsService;
using EtsZemun.Services.Model.QualificationService;
using EtsZemun.Services.Model.SubjectService;
using EtsZemun.Services.Model.TeacherService;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var googleAuthFile = "/run/secrets/google-auth";
if (File.Exists(googleAuthFile))
    builder.Configuration.AddJsonFile(googleAuthFile);
else
    builder.Configuration.AddJsonFile("secrets.json", optional: true);

var configuration = builder.Configuration;

builder.Logging.ClearProviders().AddConsole();
builder.Services.AddExceptionHandler<ExceptionHandler>();

builder
    .Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("/app/keys"))
    .SetApplicationName("EtsZemun");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SupportNonNullableReferenceTypes();
});
builder.Services.AddControllers();
builder.Services.AddHybridCache();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));

    if (builder.Environment.IsDevelopment())
        options.EnableSensitiveDataLogging();
});

builder.Services.AddDbContext<IdentityDataContext>(options =>
{
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));

    if (builder.Environment.IsDevelopment())
        options.EnableSensitiveDataLogging();
});

builder
    .Services.AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.Password.RequireUppercase = false;
    })
    .AddEntityFrameworkStores<IdentityDataContext>()
    .AddApiEndpoints()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Domain = ".localhost.com";

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

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "WebsitePolicy",
        builder =>
        {
            builder
                .WithOrigins("https://localhost.com", "https://admin.localhost.com")
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
        }
    );
});

#region Model Services

#region Language
builder.Services.AddScoped<ILanguageService, LanguageService>();
builder.Services.AddScoped<ICreateSingleService<Language>, CreateService<Language>>();
builder.Services.AddScoped<IReadRangeSelectedService<Language>, ReadService<Language>>();
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
builder.Services.AddScoped<IReadSingleService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<IReadSingleSelectedService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<IReadRangeService<Subject>, ReadService<Subject>>();
builder.Services.AddScoped<ICountService<Subject>, ReadService<Subject>>();
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
builder.Services.AddScoped<IReadRangeService<Teacher>, ReadService<Teacher>>();
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
builder.Services.AddScoped<
    IExecuteUpdateService<QualificationTranslation>,
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
    IReadRangeService<EducationalProfile>,
    ReadService<EducationalProfile>
>();
builder.Services.AddScoped<
    IReadSingleService<EducationalProfile>,
    ReadService<EducationalProfile>
>();
builder.Services.AddScoped<
    IUpdateSingleService<EducationalProfile>,
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
    IRequestMapper<CreateEducationalProfileRequestDto, EducationalProfile>,
    CreateEducationalProfileRequestMapper
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
builder.Services.AddScoped<IReadRangeService<Award>, ReadService<Award>>();
builder.Services.AddScoped<ICountService<Award>, ReadService<Award>>();
builder.Services.AddScoped<IUpdateSingleService<Award>, UpdateService<Award>>();
builder.Services.AddScoped<
    IUpdateSingleService<AwardTranslation>,
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
builder.Services.AddScoped<ICreateRangeService<NewsImage>, CreateService<NewsImage>>();
builder.Services.AddScoped<ICreateSingleService<NewsTranslation>, CreateService<NewsTranslation>>();
builder.Services.AddScoped<IReadRangeService<News>, ReadService<News>>();
builder.Services.AddScoped<IReadRangeService<NewsImage>, ReadService<NewsImage>>();
builder.Services.AddScoped<IReadSingleService<News>, ReadService<News>>();
builder.Services.AddScoped<ICountService<News>, ReadService<News>>();
builder.Services.AddScoped<ICountService<NewsImage>, ReadService<NewsImage>>();
builder.Services.AddScoped<IExecuteUpdateService<News>, UpdateService<News>>();
builder.Services.AddScoped<
    IExecuteUpdateService<NewsTranslation>,
    UpdateService<NewsTranslation>
>();
builder.Services.AddScoped<IDeleteService<News>, DeleteService<News>>();
builder.Services.AddScoped<IDeleteService<NewsImage>, DeleteService<NewsImage>>();
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
builder.Services.AddScoped<
    IResponseMapper<IdentityUser, FullUserResponseDto>,
    FullUserResponseMapper
>();
#endregion

#endregion

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var roles = new[] { "Admin", "Mod", "Teacher", "User" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

var authGroup = app.MapGroup("/auth");
authGroup.MapIdentityApi<IdentityUser>();

app.UseExceptionHandler("/error");
app.UseCors("WebsitePolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.RunAsync();
