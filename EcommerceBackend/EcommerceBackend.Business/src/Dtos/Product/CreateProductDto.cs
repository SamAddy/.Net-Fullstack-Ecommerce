namespace EcommerceBackend.Business.src.Dtos.Product
{
    public class CreateProductDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
        public Guid InventoryId { get; set; }
        public List<string> Images { get; set; }
    }
}