namespace EcommerceBackend.Domain.src.Entities
{
    public class Product : BaseEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Decimal Price { get; set; }
        public required Category Category { get; set; }
        public required Inventory Inventory { get; set; }
    }
}