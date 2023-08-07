using EcommerceBackend.Business.src.Dtos.Product;
using EcommerceBackend.Domain.src.Common;

namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface IProductService
    {
        Task<IEnumerable<ReadProductDto>> GetAllProductsAsync(QueryOptions queryOptions);
        Task<ReadProductDto> CreateProductAsync(CreateProductDto createProductDto);
        Task<ReadProductDto> UpdateProductAsync(Guid productId, UpdateProductDto updateProductDto);
        Task<ReadProductDto> GetProductByIdAsync(Guid productId);
        Task<bool> DeleteProductByIdAsync(Guid productId);
    }
}