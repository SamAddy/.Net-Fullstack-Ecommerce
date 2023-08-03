namespace EcommerceBackend.Business.src.Dtos.Product
{
    public class CreateProductDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Decimal Price { get; set; }
        public required string Category { get; set; }
    }
}