namespace EcommerceBackend.Domain.src.Entities
{
    public class Inventory : BaseEntity
    {
        public List<Product> Product { get; set; }
        public int QuantityInStock { get; set; }

    }
}