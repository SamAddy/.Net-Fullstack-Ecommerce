using AutoMapper;
using AutoMapper.Configuration.Annotations;

namespace EcommerceBackend.Domain.src.Entities
{
    public class User : BaseEntity
    {
        public required string FirstName { get; set;}
        public required string LastName { get; set;}
        public required string Email { get; set;}
        public required byte[] Password { get; set;}
        public UserRole Role { get; set;}
        public List<Order>? Orders { get; set; }
    }    
}