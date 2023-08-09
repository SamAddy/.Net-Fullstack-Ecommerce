namespace EcommerceBackend.Business.src.Dtos.Product
{
    public class UpdateProductDto
    {
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public Guid CategoryId { get; set; }
        public int Inventory { get; set; }
        public string ImageUrl { get; set; }
    }
}