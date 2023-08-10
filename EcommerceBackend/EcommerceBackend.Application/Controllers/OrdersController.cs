using EcommerceBackend.Business.src.Dtos.Order;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Common;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBackend.Application.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _ordersService;
        
        public OrdersController(IOrderService ordersService)
        {
            _ordersService = ordersService;
        }

        [HttpGet]
        public async Task<ActionResult<ReadOrderDto>> GetAllOrders()
        {
            var orders = await _ordersService.GetOrdersWithDetailsdAsync();
            return Ok(orders);
        }

        [HttpPost("Users/{userId:Guid}/Orders")]
        public async Task<ActionResult<ReadOrderDto>> CreateOrder(Guid userId, [FromBody] CreateOrderDto orderDto)
        {
            var newOrder = await _ordersService.CreateOrderAsync(userId, orderDto);
            return Ok(newOrder);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ReadOrderDto>> GetOrderById(Guid id)
        {
            var order = await _ordersService.GetOrderByIdAsync(id);
            return Ok(order);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> DeleteOrder(Guid id)
        {
            return Ok(await _ordersService.DeleteOrderByIdAsync(id));
        }

        [HttpGet("ByUser/{userId:Guid}")]
        public async Task<ActionResult<IEnumerable<ReadOrderDto>>> GetOrdersByUserIdAsync(Guid userId)
        {
            var userOrders = await _ordersService.GetOrdersByUserIdAsync(userId);
            return Ok(userOrders);
        }
    }
}