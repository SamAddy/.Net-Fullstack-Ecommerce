using EcommerceBackend.Business.src.Dtos.User;

namespace EcommerceBackend.Business.src.Dtos.Product
{
    public class ReadProductDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
    }
}