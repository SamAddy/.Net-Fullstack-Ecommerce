using EcommerceBackend.Business.src.Dtos.CategoryDtos;
using EcommerceBackend.Business.src.Dtos.Product;
using EcommerceBackend.Domain.src.Common;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface ICategoryService
    {
        Task<IEnumerable<ReadCategoryDto>> GetAllCategoriesAsync(QueryOptions queryOptions);
        Task<ReadCategoryDto> CreateCategoryAsync(CreateCategoryDto categoryDto);
        Task<ReadCategoryDto> GetCategoryByIdAsync(Guid categoryId);
        Task<ReadCategoryDto> UpdateCategoryAsync(Guid categoryId, UpdateCategoryDto categoryDto);
        Task<bool> DeleteCategoryAsync(Guid categoryId); 
        Task<IEnumerable<ReadProductDto>> GetAllProductsInCategoryAsync(Guid categoryId);
    }
}