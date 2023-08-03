namespace EcommerceBackend.Domain.src.Entities
{
    public class Category : BaseEntity
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public List<Product>? Products{ get; set; }
    }
}