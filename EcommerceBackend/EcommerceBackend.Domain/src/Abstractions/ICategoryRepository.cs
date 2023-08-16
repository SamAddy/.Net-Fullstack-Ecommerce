using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Domain.src.Abstractions
{
    public interface ICategoryRepository :  IBaseRepository<Category>
    {
        Task<Category> GetCategoryByNameAsync (string categoryName);
        Task<IEnumerable<Product>> GetAllProductsInCategoryAsync(Guid id);
    }
}