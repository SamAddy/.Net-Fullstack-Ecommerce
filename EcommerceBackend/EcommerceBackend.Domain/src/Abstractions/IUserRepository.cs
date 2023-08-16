using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Domain.src.Abstractions
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> CreateAdminAsync(User user);
        Task<User> UpdatePassword(string email, string PasswordHash);
    }
}