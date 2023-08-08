using EcommerceBackend.Business.src.Dtos.Order;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Common;

namespace EcommerceBackend.Business.src.Services.Implementations
{
    public class OrderService : IOrderService
    {
        public Task<ReadOrderDto> CreateOrderAsync(CreateOrderDto createOrderDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteOrderByIdAsync(Guid orderId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ReadOrderDto>> GetAllOrdersAsync(QueryOptions queryOptions)
        {
            throw new NotImplementedException();
        }

        public Task<ReadOrderDto> GetOrderByIdAsync(Guid OrderId)
        {
            throw new NotImplementedException();
        }
    }
}