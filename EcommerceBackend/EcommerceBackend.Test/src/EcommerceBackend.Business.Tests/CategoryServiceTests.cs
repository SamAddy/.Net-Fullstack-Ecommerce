using AutoMapper;
using EcommerceBackend.Business.src.Dtos.CategoryDtos;
using EcommerceBackend.Business.src.Services.Abstractions;
using EcommerceBackend.Business.src.Services.Implementations;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Entities;
using Moq;

namespace EcommerceBackend.Test.src.EcommerceBackend.Business.Tests
{
    public class CategoryServiceTests
    {
        [Fact]
        public void Test1()
        {
            Assert.True(true);
        }

        [Fact]
        public async Task CreateCategoryAsync_ReturnsReadProductDto()
        {
            // Arrange 
            var categoryRepositoryMock = new Mock<ICategoryRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var mapperMock = new Mock<IMapper>();

            var categoryService = new CategoryService(categoryRepositoryMock.Object, sanitizerServiceMock.Object, mapperMock.Object);
            var createCategoryDto = new CreateCategoryDto
            {
                Name = "Clothes",
                Image = "https://springonion.com/clothes.jpg"
            };

            var expectedCategoryEntity = new Category
            {
                Name = "Clothes",
                Image = "https://springonion.com/clothes.jpg"
            };

            var expectedReadCategoryDto = new ReadCategoryDto
            {
                Id = new Guid(),
                Name = "Clothes",
                Image = "https://springonion.com/clothes.jpg"
            };

            sanitizerServiceMock.Setup(s => s.SanitizeDto(It.IsAny<CreateCategoryDto>()))
                .Returns(createCategoryDto);

            categoryRepositoryMock.Setup(c => c.GetCategoryByNameAsync(It.IsAny<string>()))
                .ReturnsAsync((Category)null);

            mapperMock.Setup(c => c.Map<Category>(It.IsAny<CreateCategoryDto>()))
            .Returns(expectedCategoryEntity);

            mapperMock.Setup(c => c.Map<ReadCategoryDto>(It.IsAny<Category>()))
            .Returns(expectedReadCategoryDto);

            // Act
            var result = await categoryService.CreateCategoryAsync(createCategoryDto);

            // Assert
            Assert.Equal(expectedReadCategoryDto, result);
        }

        [Fact]
        public async Task DeleteCategory_ReturnsBoolean()
        {
            // Arrange 
            var categoryRepositoryMock = new Mock<ICategoryRepository>();
            var sanitizerServiceMock = new Mock<ISanitizerService>();
            var mapperMock = new Mock<IMapper>();

            var categoryService = new CategoryService(categoryRepositoryMock.Object, sanitizerServiceMock.Object, mapperMock.Object);
            var categoryId = Guid.NewGuid();

            var createCategoryDto = new CreateCategoryDto
            {
                Name = "Clothes",
                Image = "https://springonion.com/clothes.jpg"
            };

            var expectedCategoryEntity = new Category
            {
                Name = "Clothes",
                Image = "https://springonion.com/clothes.jpg"
            };

            categoryRepositoryMock.Setup(c => c.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(expectedCategoryEntity);
            categoryRepositoryMock.Setup(c => c.DeleteByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(true);
            
            // Act
            var result = await categoryService.DeleteCategoryAsync(categoryId);

            // Assert
            Assert.True(result);
        }
    }
}