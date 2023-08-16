using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Entities;
using EcommerceBackend.Framework.src.Database;
using Microsoft.EntityFrameworkCore;

namespace EcommerceBackend.Framework.src.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly DbSet<Category> _categories;

        public CategoryRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            _categories = _applicationDbContext.Set<Category>();
        }

        public async Task<IEnumerable<Product>> GetAllProductsInCategoryAsync(Guid id)
        {
            var category = await _categories
                    .Include(c => c.Products)
                    .FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
            {
                return null;
            }
            return category.Products;
        }

        public async Task<Category> GetCategoryByNameAsync(string categoryName)
        {
            return await _categories
                            .AsNoTracking()
                            .FirstOrDefaultAsync(c => c.Name.ToLower() == categoryName.ToLower());
        }
    }
}