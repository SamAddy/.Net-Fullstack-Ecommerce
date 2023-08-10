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

            if (createOrderDto == null)
            {
                throw new ArgumentNullException(nameof(createOrderDto));
            }
            if (createOrderDto.Items.Count !> 0)
            {
                throw new ArgumentException("Order items cannot be null.");
            }
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
                    throw new ArgumentException($"Not enough quantity available in stock for product with ID {orderItem.ProductId}.");
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
            // var orders = await _orderRepository.GetAllAsync(queryOptions);
            // var readOrderDtos = new List<ReadOrderDto>();
        
            // foreach (var order in orders)
            // {
            //     var readOrderDto = _mapper.Map<ReadOrderDto>(order);
            //     var user = await _userRepository.GetByIdAsync(order.UserId);
            //     readOrderDto.User = _mapper.Map<ReadUserDto>(user);
            //     Console.WriteLine("Right before the foreach loop. 1");
            //     var orderItemsDto = new List<ReadOrderItemDto>();

            //     // Console.WriteLine("Right before the foreach loop. 2");
            //     // foreach (var item in order.OrderItems)
            //     // {
            //     //     Console.WriteLine("Inside foreach loop. 1");
            //     //     var product = await _productRepository.GetByIdAsync(item.ProductId);

            //     //     if (product != null)
            //     //     {
            //     //         var readOrderItemDto = _mapper.Map<ReadOrderItemDto>(item);
            //     //         orderItemsDto.Add(readOrderItemDto);
            //     //     }
            //     // }
            //     readOrderDto.OrderItems = orderItemsDto;
            //     readOrderDtos.Add(readOrderDto);
            // }
            // return readOrderDtos;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ReadOrderDto>> GetOrdersWithDetailsdAsync()
        {
            var orders = await _orderRepository.GetAllOrdersWithDetailsAsync();
            var readOrderDtos = new List<ReadOrderDto>();
            foreach (var order in orders)
            {
                var readOrderDto = _mapper.Map<ReadOrderDto>(order);
                var user = await _userRepository.GetByIdAsync(order.UserId);
                readOrderDto.User = _mapper.Map<ReadUserDto>(user);
                var orderItemsDto = new List<ReadOrderItemDto>();
                foreach (var item in order.OrderItems)
                {
                    var product = await _productRepository.GetByIdAsync(item.ProductId);
                    if (product != null)
                    {
                        var readOrderItemDto = _mapper.Map<ReadOrderItemDto>(item);
                        orderItemsDto.Add(readOrderItemDto);
                    }
                }
                readOrderDto.OrderItems = orderItemsDto;
                readOrderDtos.Add(readOrderDto);
            }
            return readOrderDtos;
        }

        public async Task<ReadOrderDto> GetOrderByIdAsync(Guid orderId)
        {
            var existingOrder = await _orderRepository.GetByIdWithOtherDetailsAsync(orderId)
                ?? throw new ArgumentException("Order with ID {orderId}");
            var user = await _userRepository.GetByIdAsync(existingOrder.UserId);
            var readOrderDto = _mapper.Map<ReadOrderDto>(existingOrder);
            readOrderDto.User = _mapper.Map<ReadUserDto>(user);
            readOrderDto.OrderItems = _mapper.Map<List<ReadOrderItemDto>>(existingOrder.OrderItems);
            return readOrderDto;
        }

        public async Task<IEnumerable<ReadOrderDto>> GetOrdersByUserIdAsync(Guid userId)
        {
            Console.WriteLine("User Id received in service layer 1.");
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException($"User with ID {userId} not found.");
            }

            var userOrders = await _orderRepository.GetOrdersForUserAsync(user.Id);

            // var readUserOrdersDto = _mapper.Map<IEnumerable<ReadOrderDto>>(userOrders);
            var readUserOrdersDto = new List<ReadOrderDto>();

            foreach (var order in userOrders)
            {
                var readOrderDto = _mapper.Map<ReadOrderDto>(order);
                readOrderDto.User = _mapper.Map<ReadUserDto>(user);
                readOrderDto.OrderItems = _mapper.Map<List<ReadOrderItemDto>>(order.OrderItems);
                readUserOrdersDto.Add(readOrderDto);
            }
            return readUserOrdersDto;
        }
    }
}