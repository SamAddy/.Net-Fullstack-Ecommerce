using AutoMapper;
using EcommerceBackend.Business.src.Dtos.CategoryDtos;
using EcommerceBackend.Business.src.Dtos.Product;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Business.src.Services.Implementations;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Entities;
using Moq;

namespace EcommerceBackend.Test.src.EcommerceBackend.Business.Tests
{
    public class ProductServiceTests
    {
        [Fact]
        public void Test1()
        {
            Assert.True(true);
        }

        [Fact]
        public async Task CreateProductAsync_ValidProduct_ReturnReadProductDto()
        {
            // Arrange
            var productRepositoryMock = new Mock<IProductRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var categoryRepositoryMock = new Mock<ICategoryRepository>();
            var mapperMock = new Mock<IMapper>();

            var productService = new ProductService(productRepositoryMock.Object, mapperMock.Object, sanitizerServiceMock.Object, categoryRepositoryMock.Object);

            var createProductDto = new CreateProductDto
            {
                Name = "African wear",
                Description = "African vibe",
                Price = 100,
                CategoryId = new Guid(),
                Inventory = 50,
                ImageUrl = "https://springonion.com/dashikey.jpg"
            };

            var category = new Category
            {
                Name = "Clothes",
                Image = "https://springonion.com/clothes.jpg"
            };

            var expectedProductEntity = new Product
            {
                Name = "African wear",
                Description = "African vibe",
                Price = 100,
                CategoryId = new Guid(),
                Inventory = 50,
                ImageUrl = "https://springonion.com/dashikey.jpg"
            };

            var expectedReadProductDto = new ReadProductDto
            {
                Id = new Guid(),
                Name = "African wear",
                Description = "African vibe",
                Price = 100,
                ImageUrl = "https://springonion.com/dashikey.jpg",
                Category =  new ReadCategoryDto
                {
                    // Id = new Guid(),
                    Name = "Clothes",
                    Image = "https://springonion.com/clothes.jpg"
                }
            };

            sanitizerServiceMock.Setup(x => x.SanitizeDto(It.IsAny<CreateProductDto>()))
                .Returns(createProductDto);

            categoryRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(category);

            mapperMock.Setup(x => x.Map<Product>(It.IsAny<CreateProductDto>()))
                .Returns(expectedProductEntity);

            mapperMock.Setup(x => x.Map<ReadProductDto>(It.IsAny<Product>()))
                .Returns(expectedReadProductDto);

            // Act
            var result = await productService.CreateProductAsync(createProductDto);

            // Assert
            Assert.Equal(expectedReadProductDto, result);
        }

        [Fact]
        public async Task DeleteProductAsync_ReturnsBoolean()
        {
            // Arrange
            var productRepositoryMock = new Mock<IProductRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var categoryRepositoryMock = new Mock<ICategoryRepository>();
            var mapperMock = new Mock<IMapper>();

            var productService = new ProductService(productRepositoryMock.Object, mapperMock.Object, sanitizerServiceMock.Object, categoryRepositoryMock.Object);
            
            var productId = Guid.NewGuid();

            var createProductDto = new CreateProductDto
            {
                Name = "African wear",
                Description = "African vibe",
                Price = 100,
                CategoryId = new Guid(),
                Inventory = 50,
                ImageUrl = "https://springonion.com/dashikey.jpg"
            };

            var category = new Category
            {
                Name = "Clothes",
                Image = "https://springonion.com/clothes.jpg"
            };

            var expectedProductEntity = new Product
            {
                Name = "African wear",
                Description = "African vibe",
                Price = 100,
                CategoryId = new Guid(),
                Inventory = 50,
                ImageUrl = "https://springonion.com/dashikey.jpg"
            };

            productRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(expectedProductEntity);
            
            productRepositoryMock.Setup(x => x.DeleteByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(true);

            // Act 
            var result = await productService.DeleteProductByIdAsync(productId);

            // Assert 
            Assert.True(result);
        }
    }
}