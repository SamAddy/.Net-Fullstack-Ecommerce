namespace EcommerceBackend.Business.src.Dtos.Category
{
    public class ReadCategoryDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
    }
}