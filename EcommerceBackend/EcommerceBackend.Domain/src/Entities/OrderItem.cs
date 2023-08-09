namespace EcommerceBackend.Domain.src.Entities
{
    public class OrderItem 
    {
        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public Decimal SubTotal { get; set; }
    }
}