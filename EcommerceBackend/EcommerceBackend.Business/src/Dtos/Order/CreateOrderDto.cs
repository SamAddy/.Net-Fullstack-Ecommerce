using EcommerceBackend.Business.src.Dtos.UserDtos;

namespace EcommerceBackend.Business.src.Dtos.Order
{
    public class CreateOrderDto
    {
        public required ReadUserDto User{ get; set; }
        public DateTime OrderDate { get; set; }
        public required string OrderStatus { get; set; }
        public Decimal TotalAmount { get; set; }
        public required List<OrderItemDto> Items { get; set; }
    }
}