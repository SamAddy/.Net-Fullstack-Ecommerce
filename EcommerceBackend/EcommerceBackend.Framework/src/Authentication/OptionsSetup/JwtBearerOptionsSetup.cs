using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace EcommerceBackend.Framework.src.Authentication.OptionsSetup
{
    public class JwtBearerOptionsSetup : IConfigureOptions<JwtBearerOptions>
    {
        private readonly JwtOptions _jwtOptions;

        public JwtBearerOptionsSetup(IOptions<JwtOptions> jwtOptions)
        {
            try 
            {
                _jwtOptions = jwtOptions.Value;
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred while initializing JwtBearerOptionsSetup:");
                Console.WriteLine(ex.Message);
                throw;
            }
        }
        public void Configure(JwtBearerOptions options)
        {
            Console.WriteLine("***********************");
            Console.WriteLine("found key in bearer");
            Console.WriteLine("***********************");
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _jwtOptions.Issuer,
                ValidAudience = _jwtOptions.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_jwtOptions.SecretKey))
            };
            
        }
    }
}