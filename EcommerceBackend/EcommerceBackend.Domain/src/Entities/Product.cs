namespace EcommerceBackend.Domain.src.Entities
{
    public class Product : BaseEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Decimal Price { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public int Inventory { get; set; }
        public string ImageUrl { get; set; }
    }
}