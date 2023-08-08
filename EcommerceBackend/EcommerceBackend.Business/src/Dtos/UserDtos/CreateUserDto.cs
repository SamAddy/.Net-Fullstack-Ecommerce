using AutoMapper;
using AutoMapper.Configuration.Annotations;
using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Business.src.Dtos.UserDtos
{
    [AutoMap(typeof(User))]
    public class CreateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        [Ignore]
        public string Password { get; set; }
    }
}