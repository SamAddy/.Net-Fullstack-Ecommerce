namespace EcommerceBackend.Domain.src.Entities
{
    public class Order : BaseEntity
    {
        public Guid UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public decimal TotalAmount { get; set; }
        public required List<OrderItem> OrderItems { get; set; }
    }
}