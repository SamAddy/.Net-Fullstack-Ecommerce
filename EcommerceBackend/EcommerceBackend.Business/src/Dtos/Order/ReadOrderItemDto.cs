namespace EcommerceBackend.Business.src.Dtos.Order
{
    public class ReadOrderItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal SubTotal { get; set; }
    }
}