using EtsZemun.Data;
using EtsZemun.DTOs.Request.Language;
using EtsZemun.Exceptions;
using EtsZemun.Models;
using EtsZemun.Services.Create;
using EtsZemun.Services.Delete;
using EtsZemun.Services.Mapping.Request;
using EtsZemun.Services.Mapping.Request.LanguageMappers;
using EtsZemun.Services.Model.LanguageService;
using EtsZemun.Services.Read;
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
