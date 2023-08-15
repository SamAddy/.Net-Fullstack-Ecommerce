using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Business.src.Services.Common;
using EcommerceBackend.Business.src.Services.Implementations;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Framework.src.Authentication;
using EcommerceBackend.Framework.src.Authentication.OptionsSetup;
using EcommerceBackend.Framework.src.Database;
using EcommerceBackend.Framework.src.Middlewares;
using EcommerceBackend.Framework.src.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>();

builder.Services.AddControllers();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

builder.Services.AddScoped<ISanitizerService, SanitizerService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<PasswordService>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtManager, JwtManager>();

// Configure JwtOptions
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));
builder.Services.AddSingleton<IConfigureOptions<JwtOptions>, JwtOptionsSetup>();

// Configure JwtBearereOptions
// builder.Services.AddSingleton<IConfigureOptions<JwtBearerOptions>, JwtBearerOptionsSetup>();
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer();
JwtConfiguration.ConfigureJwt(builder.Services, builder.Configuration);
Console.WriteLine("Done Configuring JwtBearereOptions");

builder.Services.AddScoped<LoggingMiddleWare>();
builder.Services.AddScoped<ErrorHandlerMiddleware>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Bearer token authentication",
        Name = "Authentication",
        In = ParameterLocation.Header,
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});


// Add Auto Mapper Profile service
builder.Services.AddAutoMapper(typeof(Program).Assembly);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<LoggingMiddleWare>();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
