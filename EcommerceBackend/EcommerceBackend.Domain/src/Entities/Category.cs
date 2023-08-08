using System.ComponentModel.DataAnnotations;

namespace EcommerceBackend.Domain.src.Entities
{
    public class Category : BaseEntity
    {
        public required string Name { get; set; }
        [Url]
        public required string Image { get; set; }
        public List<Product>? Products{ get; set; }
    }
}