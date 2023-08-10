using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Entities;
using EcommerceBackend.Framework.src.Database;
using Microsoft.EntityFrameworkCore;


namespace EcommerceBackend.Framework.src.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly DbSet<User> _users;
       
        public UserRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            _users = _applicationDbContext.Set<User>();
        }

        public async Task<User> CreateAdminAsync(User user)
        {
            user.Role = UserRole.Admin;
            var entry = await _users.AddAsync(user);
            await _applicationDbContext.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }
    }
}