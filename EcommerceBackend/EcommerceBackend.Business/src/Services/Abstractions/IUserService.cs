using EcommerceBackend.Business.src.Common;
using EcommerceBackend.Business.src.Dtos.User;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface IUserService
    {
        Task<IEnumerable<ReadUserDto>> GetAllUsersAsync(QueryOptions queryOptions);
        Task<ReadUserDto> CreateUserAsync(CreateUserDto userDto);
        Task<ReadUserDto> GetUserByIdAsync(Guid userId);
        Task<ReadUserDto> GetUserByEmailAsync(string email);
        Task<ReadUserDto> UpdateUserAsync(Guid userId, UpdateUserDto userDto);
        Task<bool> DeleteUserAsync(Guid userId); 
    }
}