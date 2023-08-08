namespace EcommerceBackend.Business.src.Dtos.CategoryDtos
{
    public class ReadCategoryDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Image { get; set; }
    }
}