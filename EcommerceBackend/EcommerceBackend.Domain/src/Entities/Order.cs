namespace EcommerceBackend.Domain.src.Entities
{
    public class Order : BaseEntity
    {
        public User user{ get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public Decimal TotalAmount { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}