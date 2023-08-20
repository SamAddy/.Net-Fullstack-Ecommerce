using AutoMapper;
using EcommerceBackend.Business.src.Dtos.UserDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Business.src.Services.Common;
using EcommerceBackend.Business.src.Services.Implementations;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;
using Moq;

namespace EcommerceBackend.Test.src.EcommerceBackend.Business.Tests
{
    public class UserServiceTests
    {
        [Fact]
        public async Task CreateUserAsync_ValidInput_ReturnsReadUserDto()
        {
            // Arrange
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
            
            // Setup mock dependencies
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
        public async Task CreateUserAsync_InvalidInput_ReturnsArguementException()
        {
            // Arrange
            var userRepositoryMock = new  Mock<IUserRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var mapperMock = new Mock<IMapper>();

            var userService = new UserService(userRepositoryMock.Object, sanitizerServiceMock.Object, mapperMock.Object);

            var invalidUserDto = new CreateUserDto
            {
                FirstName = "",
                LastName = "Cash",
                Email = "allan@mail.com",
                Password = "allan1234"
            };

            // Setup mock dependencies
            sanitizerServiceMock.Setup(s => s.SanitizeDto(It.IsAny<CreateUserDto>()))
                .Returns(invalidUserDto);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(async () => await userService.CreateUserAsync(invalidUserDto));
        }

        [Fact]
        public async Task CreateAdminAsync_ValidInput_ReturnsReadUserDto()
        {
            // Arrange
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
            var expectedAdminEntity = new User
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
                Role = "Admin",
            };
            
            // Setup mock dependencies
            sanitizerServiceMock.Setup(s => s.SanitizeDto(It.IsAny<CreateUserDto>()))
                .Returns(createUserDto);

            userRepositoryMock.Setup(u => u.GetUserByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((User)null);
            
            mapperMock.Setup(u => u.Map<User>(It.IsAny<CreateUserDto>()))
                .Returns(expectedAdminEntity);

            mapperMock.Setup(m => m.Map<ReadUserDto>(It.IsAny<User>()))
                .Returns(expectedReadUserDto);

            // Act
            var result = await userService.CreateAdminAsync(createUserDto);

            // Assert
            Assert.Equal(expectedReadUserDto, result);
        }

        [Fact]
        public async Task CreateUserAsync_DuplicateEmail_ReturnsArguementException()
        {
            // Arrange
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

            var duplicateUserDto = new CreateUserDto
            {
                FirstName = "Steve",
                LastName = "Cash",
                Email = "allan@mail.com",
                Password = "allan1234"
            };
            var passwordHash1 = PasswordService.HashPassword(createUserDto.Password);
            
            var expectedUserEntity = new User
            {
                FirstName = "Allan",
                LastName = "Cash",
                Email = "allan@mail.com",
                PasswordHash = passwordHash1
            };

            var expectedReadUserDto = new ReadUserDto
            {
                Id = new Guid(),
                FirstName = "Allan",
                LastName = "Cash",
                Email = "allan@mail.com",
                Role = "Admin",
            };
            
            // Setup mock dependencies
            sanitizerServiceMock.Setup(s => s.SanitizeDto(It.IsAny<CreateUserDto>()))
                .Returns(createUserDto);

            userRepositoryMock.Setup(u => u.GetUserByEmailAsync("allan@mail.com"))
                .ReturnsAsync((User)null)
                .Verifiable();
            
            mapperMock.Setup(u => u.Map<User>(It.IsAny<CreateUserDto>()))
                .Returns(expectedUserEntity);

            mapperMock.Setup(m => m.Map<ReadUserDto>(It.IsAny<User>()))
                .Returns(expectedReadUserDto);

            // Act
            var result = await userService.CreateUserAsync(createUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedReadUserDto, result);

            userRepositoryMock.Setup(u => u.GetUserByEmailAsync("allan@mail.com"))
                .ReturnsAsync(expectedUserEntity);

            await Assert.ThrowsAsync<ArgumentException>(async () => await userService.CreateUserAsync(duplicateUserDto));
        }

        [Fact]
        public async Task GetAllUsersAsync_ReturnsListOfUsers()
        {
            // Arrange
            var userRepositoryMock = new  Mock<IUserRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var mapperMock = new Mock<IMapper>();

            var userService = new UserService(userRepositoryMock.Object, sanitizerServiceMock.Object, mapperMock.Object);
            var queryOptions = new QueryOptions
            {

            };

            var usersFromRepository = new List<User>
            {
                new User {
                    FirstName = "Allan",
                    LastName = "Cash",
                    Email = "allan@mail.com",
                    PasswordHash = "springonion"
                },
                new User {
                    FirstName = "Bismark",
                    LastName = "The Joke",
                    Email = "bismark@mail.com",
                    PasswordHash = "springonion"
                },
                new User {
                    FirstName = "Sherif",
                    LastName = "Boka",
                    Email = "sherif@mail.com",
                    PasswordHash = "springonion"
                },
            };

            var expectedReadUserDtos = new List<ReadUserDto>
            {
                new ReadUserDto {
                    Id = new Guid(),
                    FirstName = "Allan",
                    LastName = "Cash",
                    Email = "allan@mail.com",
                    Role = "Customer",
                },
                new ReadUserDto {
                    Id = new Guid(),
                    FirstName = "Bismark",
                    LastName = "The Joke",
                    Email = "bismark@mail.com",
                    Role = "Customer",
                },
                new ReadUserDto {
                    Id = new Guid(),
                    FirstName = "Sherif",
                    LastName = "Boka",
                    Email = "sherif@mail.com",
                    Role = "Customer",
                },
            };

            userRepositoryMock.Setup(u => u.GetAllAsync(queryOptions))
                .ReturnsAsync(usersFromRepository);
            
            mapperMock.Setup(m => m.Map<IEnumerable<ReadUserDto>>(It.IsAny<IEnumerable<User>>()))
                .Returns(expectedReadUserDtos);

            // Act
            var result = await userService.GetAllUsersAsync(queryOptions);

            // Assert
            Assert.Equal(expectedReadUserDtos, result);
        }

        [Fact]
        public async Task GetUserByEmailAsync_ExistingEmail_ReturnsReadUserDto()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUserRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var mapperMock = new Mock<IMapper>();

            var userService = new UserService(userRepositoryMock.Object, sanitizerServiceMock.Object, mapperMock.Object);

            var email = "allan@mail.com";

            var userFromRepository = new User
            {
                FirstName = "Allan",
                LastName = "Cash",
                Email = "allan@mail.com",
                PasswordHash = "springonion"
            };

            var expectedReadUserDto = new ReadUserDto
            {
                Id = new Guid(),
                    FirstName = "Allan",
                    LastName = "Cash",
                    Email = "allan@mail.com",
                    Role = "Customer",
            };

            userRepositoryMock.Setup(x => x.GetUserByEmailAsync(email))
                .ReturnsAsync(userFromRepository);

            mapperMock.Setup(x => x.Map<ReadUserDto>(It.IsAny<User>()))
                .Returns(expectedReadUserDto);

            // Act
            var result = await userService.GetUserByEmailAsync(email);

            // Assert
            Assert.Equal(expectedReadUserDto, result);
        }
    }
}