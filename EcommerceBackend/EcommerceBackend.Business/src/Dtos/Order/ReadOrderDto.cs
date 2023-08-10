using EcommerceBackend.Business.src.Dtos.UserDtos;

namespace EcommerceBackend.Business.src.Dtos.Order
{
    public class ReadOrderDto
    {
        public Guid Id { get; set; }
        public ReadUserDto User { get; set; }
        public DateTime OrderDate { get; set; }
        public List<ReadOrderItemDto> OrderItems { get; set; }
        public decimal TotalAmount { get; set; }
    }
}