namespace EcommerceBackend.Domain.src.Entities
{
    public class Inventory : BaseEntity
    {
        public required List<Product> Product { get; set; }
        public int QuantityInStock { get; set; }

    }
}