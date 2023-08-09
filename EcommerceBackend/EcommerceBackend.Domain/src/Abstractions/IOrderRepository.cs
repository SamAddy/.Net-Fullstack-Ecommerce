using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Domain.src.Abstractions
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        Task<IEnumerable<Order>> GetOrdersForUserAsync(Guid userId);
    }
}