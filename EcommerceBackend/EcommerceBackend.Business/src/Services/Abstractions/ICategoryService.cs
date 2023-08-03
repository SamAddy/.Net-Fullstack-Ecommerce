using EcommerceBackend.Business.src.Common;
using EcommerceBackend.Business.src.Dtos.Category;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface ICategoryService
    {
        Task<IEnumerable<ReadCategoryDto>> GetAllCategoriesAsync(QueryOptions queryOptions);
        Task<ReadCategoryDto> CreateCategoryAsync(CreateCategoryDto categoryDto);
        Task<ReadCategoryDto> GetCategoryByIdAsync(Guid categoryId);
        Task<ReadCategoryDto> UpdateCategoryAsync(Guid categoryId, UpdateCategoryDto categoryDto);
        Task<bool> DeleteCategoryAsync(Guid categoryId); 
    }
}