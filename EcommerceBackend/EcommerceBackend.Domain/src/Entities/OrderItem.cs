namespace EcommerceBackend.Domain.src.Entities
{
    public class OrderItem 
    {
        public Order Order { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public Decimal SubTotal { get; set; }
    }
}