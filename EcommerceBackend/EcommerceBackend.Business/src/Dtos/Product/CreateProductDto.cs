namespace EcommerceBackend.Business.src.Dtos.Product
{
    public class CreateProductDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
        public int Inventory { get; set; }
        public string? ImageUrl { get; set; }
    }
}