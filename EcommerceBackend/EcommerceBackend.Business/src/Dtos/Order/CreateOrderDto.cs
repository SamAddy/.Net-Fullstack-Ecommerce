namespace EcommerceBackend.Business.src.Dtos.Order
{
    public class CreateOrderDto
    {
        public required List<OrderItemDto> Items { get; set; }
    }
}