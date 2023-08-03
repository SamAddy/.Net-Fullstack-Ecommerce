using EcommerceBackend.Business.src.Dtos.Product;

namespace EcommerceBackend.Business.src.Dtos.Order
{
    public class OrderItemDto
    {
        public required ReadOrderDto Order { get; set; }
        public required ReadProductDto Product { get; set; }
        public int Quantity { get; set; }
        public Decimal SubTotal { get; set; }
    }
}