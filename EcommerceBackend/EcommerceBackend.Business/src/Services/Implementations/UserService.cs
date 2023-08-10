using System.Text;
using AutoMapper;
using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Business.src.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ISanitizerService _sanitizerService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, ISanitizerService sanitizerService, IMapper mapper)
        {
            _userRepository = userRepository;
            _sanitizerService = sanitizerService;
            _mapper = mapper;
        }

        public async Task<ReadUserDto> CreateUserAsync(CreateUserDto userDto)
        {
            try
            {
                var sanitizedDto = _sanitizerService.SanitizeDto(userDto);

                var existingUser = await _userRepository.GetUserByEmailAsync(sanitizedDto.Email);

                var userDtoProperties = typeof(CreateUserDto).GetProperties();
                foreach (var property in userDtoProperties)
                {
                    var dtoValue = property.GetValue(userDto);
                    if (dtoValue is null or (object)"")
                    {
                        throw new ArgumentException($"{property.Name} is required.");
                    }
                }

                bool IsValidEmail = Validator.IsValidEmail(sanitizedDto.Email);

                if (!IsValidEmail)
                {
                    throw new ArgumentException("Invalid Email address.");
                }

                if (existingUser is not null)
                {
                    throw new ArgumentException("A user with this email already exist.");
                }

                var userEntity = _mapper.Map<User>(sanitizedDto);

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(sanitizedDto.Password);
                userEntity.Password = Encoding.UTF8.GetBytes(hashedPassword);
                userEntity = await _userRepository.AddAsync(userEntity);
                
                var hashedPasswordString = Encoding.UTF8.GetString(userEntity.Password);
                userDto.Password = hashedPasswordString;

                var readUserDto = _mapper.Map<ReadUserDto>(userEntity);
                return readUserDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Mapping error: " + ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine("Inner exception: " + ex.InnerException.Message);
                }
                throw;
            }
        }

        public async Task<ReadUserDto> CreateAdminAsync(CreateUserDto userDto)
        {
            try
            {
                var sanitizedDto = _sanitizerService.SanitizeDto(userDto);

                var existingUser = await _userRepository.GetUserByEmailAsync(sanitizedDto.Email);

                var userDtoProperties = typeof(CreateUserDto).GetProperties();
                foreach (var property in userDtoProperties)
                {
                    var dtoValue = property.GetValue(userDto);
                    if (dtoValue is null or (object)"")
                    {
                        throw new ArgumentException($"{property.Name} is required.");
                    }
                }

                bool IsValidEmail = Validator.IsValidEmail(sanitizedDto.Email);

                if (!IsValidEmail)
                {
                    throw new ArgumentException("Invalid Email address.");
                }

                if (existingUser is not null)
                {
                    throw new ArgumentException("A user with this email already exist.");
                }

                var userEntity = _mapper.Map<User>(sanitizedDto);

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(sanitizedDto.Password);
                userEntity.Password = Encoding.UTF8.GetBytes(hashedPassword);
                userEntity = await _userRepository.CreateAdminAsync(userEntity);
                
                var hashedPasswordString = Encoding.UTF8.GetString(userEntity.Password);
                userDto.Password = hashedPasswordString;

                var readUserDto = _mapper.Map<ReadUserDto>(userEntity);
                return readUserDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Mapping error: " + ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine("Inner exception: " + ex.InnerException.Message);
                }
                throw;
            }
        }

        public async Task<bool> DeleteUserByIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            return await _userRepository.DeleteByIdAsync(userId);
        }

        public async Task<IEnumerable<ReadUserDto>> GetAllUsersAsync(QueryOptions queryOptions)
        {
            var users = await _userRepository.GetAllAsync(queryOptions);
            var readUserDtos = _mapper.Map<IEnumerable<ReadUserDto>>(users);
            return readUserDtos;
        }

        public async Task<ReadUserDto> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            var readUserDto = _mapper.Map<ReadUserDto>(user);
            return readUserDto;
        }

        public async Task<ReadUserDto> GetUserByIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            var readUserDto = _mapper.Map<ReadUserDto>(user);
            return readUserDto;
        }

        public async Task<ReadUserDto> UpdateUserAsync(Guid userId, UpdateUserDto updateUserDto)
        {
            try
            {
                var existingUser = await _userRepository.GetByIdAsync(userId);
                if (existingUser == null)
                {
                    throw new ArgumentException($"User with ID {userId} not found.");
                }

                var userDtoProperties = typeof(UpdateUserDto).GetProperties();
                foreach (var property in userDtoProperties)
                {
                    var dtoValue = property.GetValue(updateUserDto);
                    if (dtoValue != null)
                    {
                        if (property.Name.ToLower() == "password" && !string.IsNullOrEmpty(updateUserDto.Password))
                        {
                            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(updateUserDto.Password);
                            existingUser.Password = Encoding.UTF8.GetBytes(hashedPassword);
                        }
                        else
                        {
                            var userProperty = existingUser.GetType().GetProperty(property.Name);
                            userProperty.SetValue(existingUser, dtoValue);
                        }
                    }
                }

                existingUser = await _userRepository.UpdateAsync(userId, existingUser);

                var readUserDto = _mapper.Map<ReadUserDto>(existingUser);
                return readUserDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);

                if (ex.InnerException != null)
                {
                    Console.WriteLine("Inner exception: " + ex.InnerException.Message);
                }
                throw;
            }
        }
    }
}