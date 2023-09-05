using EcommerceBackend.Business.src.Dtos.CategoryDtos;

namespace EcommerceBackend.Business.src.Dtos.Product
{
    public class ReadProductDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public required string Description { get; set; }
        public string ImageUrl { get; set; }
        public decimal Inventory { get; set; }
        public  ReadCategoryDto Category { get; set; }
    }
}