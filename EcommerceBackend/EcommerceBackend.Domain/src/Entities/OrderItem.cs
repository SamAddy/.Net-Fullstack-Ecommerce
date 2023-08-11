namespace EcommerceBackend.Domain.src.Entities
{
    public class OrderItem : TimeStamp
    {
        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public decimal SubTotal { get; set; }
    }
}