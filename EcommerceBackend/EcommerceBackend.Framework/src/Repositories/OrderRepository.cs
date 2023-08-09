using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Entities;
using EcommerceBackend.Framework.src.Database;
using Microsoft.EntityFrameworkCore;

namespace EcommerceBackend.Framework.src.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly DbSet<Order> _orders;

        public OrderRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            _orders = _applicationDbContext.Set<Order>();
        }

        public async Task<IEnumerable<Order>> GetOrdersForUserAsync(Guid userId)
        {
            var orders = await _orders.Where(o => o.UserId == userId).ToListAsync();
            return orders;
        }
    }
}