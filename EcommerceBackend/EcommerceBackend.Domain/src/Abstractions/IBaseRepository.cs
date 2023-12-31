using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;

namespace EcommerceBackend.Domain.src.Abstractions
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        Task<IEnumerable<TEntity>> GetAllAsync(QueryOptions queryOptions);
        Task<TEntity> AddAsync(TEntity entity);
        Task<TEntity> GetByIdAsync(Guid entityId);
        Task<TEntity> UpdateAsync(Guid entityId, TEntity entity);
        Task<bool> DeleteByIdAsync(Guid entityId);
    }
}