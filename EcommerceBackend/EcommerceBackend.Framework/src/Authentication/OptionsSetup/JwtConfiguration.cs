using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

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
    
            Console.WriteLine("secret key" + jwtOptions.SecretKey);
            services.AddSingleton<IConfigureOptions<JwtBearerOptions>, JwtBearerOptionsSetup>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer();
        }
    }
}