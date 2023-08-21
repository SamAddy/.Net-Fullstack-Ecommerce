using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

namespace EcommerceBackend.Framework.src.Authentication.OptionsSetup
{
    public static class JwtConfiguration
    {
        public static void ConfigureJwt(IServiceCollection services, IConfiguration configuration)
        {
            var jwtOptions = configuration.GetSection("JwtOptions").Get<JwtOptions>();

            services.Configure<JwtOptions>(options =>
            {
                options.Issuer = jwtOptions.Issuer;
                options.Audience = jwtOptions.Audience;
                options.SecretKey = jwtOptions.SecretKey;
            });

            services.AddSingleton<IConfigureOptions<JwtBearerOptions>, JwtBearerOptionsSetup>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtOptions.Issuer,
                        ValidAudience = jwtOptions.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtOptions.SecretKey))
                    };
                });

            // services.AddAuthorization(options => 
            // {
                
            // });

            // services.AddSwaggerGen(options => 
            // {
            //     options.AddSecurityDefinition("jwt", new OpenApiSecurityScheme
            //     {
            //         Description = "Bearer token authentication",
            //         Name = "Authentication",
            //         In = ParameterLocation.Header,
            //         Type = SecuritySchemeType.Http,
            //         Scheme = "Bearer"
            //     });
            //     options.AddSecurityRequirement(new OpenApiSecurityRequirement
            //     {
            //         {
            //             new OpenApiSecurityScheme
            //             {
            //                 Reference = new OpenApiReference
            //                 {
            //                     Type = ReferenceType.SecurityScheme,
            //                     Id = "Bearer"
            //                 }
            //             },
            //             Array.Empty<string>()
            //         }
            //     });
            //     options.OperationFilter<SecurityRequirementsOperationFilter>();
            // });
        }
    }
}