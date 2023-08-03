using EcommerceBackend.Business.src.Common;
using EcommerceBackend.Business.src.Dtos.Order;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface IOrderService
    {
        Task<IEnumerable<ReadOrderDto>> GetAllOrdersAsync(QueryOptions queryOptions);
        Task<ReadOrderDto> CreateOrderAsync(CreateOrderDto createOrderDto);
        // Task<ReadOrderDto> UpdateOrderAsync(Guid OrderId, UpdateOrderDto updateOrderDto);
        Task<ReadOrderDto> GetOrderByIdAsync(Guid OrderId);
        Task<bool> DeleteOrderByIdAsync(Guid orderId);
    }
}