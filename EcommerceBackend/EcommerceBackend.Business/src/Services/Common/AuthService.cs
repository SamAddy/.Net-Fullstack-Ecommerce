using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Business.src.Services.Implementations;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Business.src.Services.Common
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtManager _jwtManager;

        public AuthService(IUserRepository userRepository, IJwtManager jwtManager)
        {
            _userRepository = userRepository;
            _jwtManager = jwtManager;
        }

        public async Task<string> AutheticateUser(UserCredentialsDto userCredentials)
        {
            var user = await _userRepository.GetUserByEmailAsync(userCredentials.Email);
            var isAuthenticated = PasswordService.VerifyPassword(user.PasswordHash, userCredentials.Password);
            if (!isAuthenticated)
            {
                throw new ArgumentException("Invalid login credentials");
            }
            if (!isAuthenticated)
            {
                throw new ArgumentException("Invalid login credentials password");
            }
            string token = _jwtManager.GenerateAccessToken(user);
            return token;
        }
    }
}