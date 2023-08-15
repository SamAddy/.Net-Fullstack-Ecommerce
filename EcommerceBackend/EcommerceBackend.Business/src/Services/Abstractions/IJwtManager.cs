using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface IJwtManager
    {
        public string GenerateAccessToken(User user);
    }
}