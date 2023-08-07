using EcommerceBackend.Business.src.Dtos.User;
using EcommerceBackend.Domain.src.Common;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface IUserService
    {
        Task<IEnumerable<ReadUserDto>> GetAllUsersAsync(QueryOptions queryOptions);
        Task<ReadUserDto> CreateUserAsync(CreateUserDto userDto);
        Task<ReadUserDto> GetUserByIdAsync(Guid userId);
        Task<ReadUserDto> GetUserByEmailAsync(string email);
        Task<ReadUserDto> UpdateUserAsync(Guid userId, UpdateUserDto userDto);
        Task<bool> DeleteUserByIdAsync(Guid userId); 
    }
}