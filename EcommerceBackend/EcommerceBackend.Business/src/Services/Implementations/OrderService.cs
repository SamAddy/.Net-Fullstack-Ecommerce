using AutoMapper;
using EcommerceBackend.Business.src.Dtos.Order;
using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Business.src.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;
        private readonly ISanitizerService _sanitizerService;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IUserRepository userRepository, 
                IProductRepository productRepository, 
                ISanitizerService sanitizerService,
                IMapper mapper)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _productRepository = productRepository;
            _sanitizerService = sanitizerService;
            _mapper = mapper;   
        }

        public async Task<ReadOrderDto> CreateOrderAsync(Guid userId, CreateOrderDto createOrderDto)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            var newOrder = _mapper.Map<Order>(createOrderDto);
            newOrder.UserId = userId;
            newOrder.OrderDate = DateTime.UtcNow;
            newOrder.OrderStatus  = OrderStatus.Pending;
            newOrder.OrderItems = new List<OrderItem>();

            foreach (var orderDto in createOrderDto.Items)
            {
                var orderItem = _mapper.Map<OrderItem>(orderDto);
                newOrder.OrderItems.Add(orderItem);
            }
            foreach (var orderItem in newOrder.OrderItems)
            {
                var product = await _productRepository.GetByIdAsync(orderItem.ProductId);
                if (product == null)
                {
                    throw new ArgumentException($"Product with ID {orderItem.ProductId} not found.");
                }
                if (orderItem.Quantity > product.Inventory)
                {
                    throw new ArgumentException("Not enough quantity available in stock.");
                }
                product.Inventory -= orderItem.Quantity;

                orderItem.Product = product;
                orderItem.SubTotal = orderItem.Quantity * product.Price;
            }
            newOrder.TotalAmount = newOrder.OrderItems.Sum(item => item.SubTotal);
            newOrder = await _orderRepository.AddAsync(newOrder);
            
            var readOrderDto = _mapper.Map<ReadOrderDto>(newOrder);
            readOrderDto.User = _mapper.Map<ReadUserDto>(user);
            return readOrderDto;
        }

        public async Task<bool> DeleteOrderByIdAsync(Guid orderId)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            return await _orderRepository.DeleteByIdAsync(existingOrder.Id);
        }

        public async Task<IEnumerable<ReadOrderDto>> GetAllOrdersAsync(QueryOptions queryOptions)
        {
            var orders = await _orderRepository.GetAllAsync(queryOptions);
            var readOrderDtos = _mapper.Map<IEnumerable<ReadOrderDto>>(orders);
            return readOrderDtos;
        }

        public async Task<ReadOrderDto> GetOrderByIdAsync(Guid orderId)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId)
                ?? throw new ArgumentException($"Order with ID {orderId} not found") ;
            var readOrderDto = _mapper.Map<ReadOrderDto>(existingOrder);
            return readOrderDto;
        }

        public async Task<IEnumerable<ReadOrderDto>> GetOrdersByUserIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            var userOrders = await _orderRepository.GetOrdersForUserAsync(user.Id);
            var readUserOrdersDto = _mapper.Map<IEnumerable<ReadOrderDto>>(userOrders);
            return readUserOrdersDto;
        }
    }
}