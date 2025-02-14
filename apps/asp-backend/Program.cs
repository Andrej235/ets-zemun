using EtsZemun.Data;
using EtsZemun.DTOs.Request.Language;
using EtsZemun.DTOs.Request.Qualification;
using EtsZemun.DTOs.Request.Subject;
using EtsZemun.DTOs.Request.Teacher;
using EtsZemun.DTOs.Response.Qualification;
using EtsZemun.DTOs.Response.Subject;
using EtsZemun.DTOs.Response.Teacher;
using EtsZemun.Exceptions;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Request.LanguageMappers;
using EtsZemun.Services.Mapping.Request.QualificationMappers;
using EtsZemun.Services.Mapping.Request.SubjectMappers;
using EtsZemun.Services.Mapping.Request.TeacherMappers;
using EtsZemun.Services.Mapping.Response;
using EtsZemun.Services.Mapping.Response.QualificationMappers;
using EtsZemun.Services.Mapping.Response.SubjectMappers;
using EtsZemun.Services.Mapping.Response.TeacherMappers;
using EtsZemun.Services.Model.LanguageService;
using EtsZemun.Services.Model.QualificationService;
using EtsZemun.Services.Model.SubjectService;
using EtsZemun.Services.Model.TeacherService;
using EtsZemun.Services.Read;
using EtsZemun.Services.Update;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.DataProtection;
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
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddHybridCache();

builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
    })
    .AddCookie(options =>
    {
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.Domain = ".localhost.com";
    })
    .AddGoogle(options =>
    {
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
    });

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));

    if (builder.Environment.IsDevelopment())
        options.EnableSensitiveDataLogging();
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

#endregion

var app = builder.Build();
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
