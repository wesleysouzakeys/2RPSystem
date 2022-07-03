global using API2RP_wepAPI.Domains;
using API2RP_wepAPI.Controllers;
using API2RP_wepAPI.Interfaces;
using API2RP_wepAPI.Repositories;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = "JwtBearer";
        options.DefaultChallengeScheme = "JwtBearer";
    })
    .AddJwtBearer("JwtBearer", options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("2rpsystem-token-autenticacao")),
            ClockSkew = TimeSpan.FromMinutes(30),
            ValidIssuer = "2RPSystem_API",
            ValidAudience = "2RPSystem_API"
        };
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "2RPNet ApplyTest API",
        Description = "Uma API ASP.NET responsável por Atualizações e Cadastros de Usuários no Sistema 2RPSystem",
        Contact = new OpenApiContact
        {
            Name = "Wesley de Souza",
            Url = new Uri("https://github.com/wesleysouzakeys")
        }
    });

    // using System.Reflection;
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
