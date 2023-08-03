using EcommerceBackend.Business.src.Dtos.User;

namespace EcommerceBackend.Business.src.Dtos.Product
{
    public class ReadProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
    }
}