namespace EcommerceBackend.Domain.src.Entities
{
    public class Order : BaseEntity
    {
        public required User User{ get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public Decimal TotalAmount { get; set; }
        public required List<OrderItem> OrderItems { get; set; }
    }
}