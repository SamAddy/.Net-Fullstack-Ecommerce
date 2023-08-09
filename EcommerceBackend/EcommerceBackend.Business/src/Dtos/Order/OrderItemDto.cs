using EcommerceBackend.Business.src.Dtos.Product;

namespace EcommerceBackend.Business.src.Dtos.Order
{
    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}