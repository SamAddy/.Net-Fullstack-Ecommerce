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
        public async Task<ActionResult<ReadOrderDto>> GetAllOrders([FromQuery] QueryOptions queryOptions)
        {
            var orders = await _ordersService.GetAllOrdersAsync(queryOptions);
            return Ok(orders);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ReadOrderDto>> GetOrderById(Guid Id)
        {
            var order = await _ordersService.GetOrderByIdAsync(Id);
            return Ok(order);
        }

        [HttpPost("Users/{userId:Guid}/Orders")]
        public async Task<ActionResult<ReadOrderDto>> CreateOrder(Guid userId, [FromBody] CreateOrderDto orderDto)
        {
            var newOrder = await _ordersService.CreateOrderAsync(userId, orderDto);
            return Ok(newOrder);
        }
    }
}