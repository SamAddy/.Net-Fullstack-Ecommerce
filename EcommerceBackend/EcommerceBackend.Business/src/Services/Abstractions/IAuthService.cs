using EcommerceBackend.Business.src.Dtos.UserDtos;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface IAuthService
    {
        Task<string> AutheticateUser(UserCredentialsDto userCredentials);
        Task<string> RefreshToken(string refreshToken);
    }
}