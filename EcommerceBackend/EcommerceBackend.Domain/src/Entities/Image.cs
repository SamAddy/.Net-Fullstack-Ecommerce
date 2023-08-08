namespace EcommerceBackend.Domain.src.Entities
{
    public class Image : BaseEntity
    {
        public string ImageUrl { get; set; }
        public bool IsPrimaryImage { get; set; }
        public virtual Product Product { get; set; }
    }
}