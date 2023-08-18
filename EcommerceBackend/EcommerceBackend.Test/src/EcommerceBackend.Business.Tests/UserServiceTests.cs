using AutoMapper;
using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Business.src.Services.Common;
using EcommerceBackend.Business.src.Services.Implementations;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Entities;
using Moq;

namespace EcommerceBackend.Test.src.EcommerceBackend.Business.Tests
{
    public class UserServiceTests
    {
        [Fact]
        public async Task CreateUserAsync_ValidInput_ReturnsReadUserDto()
        {
            var userRepositoryMock = new  Mock<IUserRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var mapperMock = new Mock<IMapper>();

            var userService = new UserService(userRepositoryMock.Object, sanitizerServiceMock.Object, mapperMock.Object);

            var createUserDto = new CreateUserDto
            {
                FirstName = "Allan",
                LastName = "Cash",
                Email = "allan@mail.com",
                Password = "allan1234"
            };
            var passwordHash = PasswordService.HashPassword(createUserDto.Password);
            var expectedUserEntity = new User
            {
                FirstName = "Allan",
                LastName = "Cash",
                Email = "allan@mail.com",
                PasswordHash = passwordHash
            };

            var expectedReadUserDto = new ReadUserDto
            {
                Id = new Guid(),
                FirstName = "Allan",
                LastName = "Cash",
                Email = "allan@mail.com",
                Role = "Customer",
            };

            sanitizerServiceMock.Setup(s => s.SanitizeDto(It.IsAny<CreateUserDto>()))
                .Returns(createUserDto);

            userRepositoryMock.Setup(u => u.GetUserByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((User)null);
            
            mapperMock.Setup(u => u.Map<User>(It.IsAny<CreateUserDto>()))
                .Returns(expectedUserEntity);

            mapperMock.Setup(m => m.Map<ReadUserDto>(It.IsAny<User>()))
                .Returns(expectedReadUserDto);

            // Act
            var result = await userService.CreateUserAsync(createUserDto);

            // Assert
            Assert.Equal(expectedReadUserDto, result);
        }

        [Fact]
        public async Task CreateUserAsync_InvalidInput_ReturnsNull()
        {

        }
    }
}