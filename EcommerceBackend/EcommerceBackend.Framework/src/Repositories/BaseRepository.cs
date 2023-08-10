using System.Linq.Dynamic.Core;
using EcommerceBackend.Domain.src.Abstractions;
using EcommerceBackend.Domain.src.Common;
using EcommerceBackend.Domain.src.Entities;
using EcommerceBackend.Framework.src.Database;
using Microsoft.EntityFrameworkCore;

namespace EcommerceBackend.Framework.src.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly DbSet<TEntity> _dbSet;

        public BaseRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            _dbSet = _applicationDbContext.Set<TEntity>();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            try
            {
                if (entity is User userEntity)
                {
                    if (userEntity.Role != UserRole.Admin)
                    {
                        userEntity.Role = UserRole.Customer;
                    }
                }
                var entry = await _dbSet.AddAsync(entity);
                await _applicationDbContext.SaveChangesAsync();
                return entry.Entity;
            }
            catch (DbUpdateException ex)
            {                
                Console.WriteLine("Base Repository exception.");
                if (ex.InnerException != null)
                {
                    Console.WriteLine("Inner exception: " + ex.InnerException.Message);
                }
                throw;
            }
        }

        public async Task<bool> DeleteByIdAsync(Guid entityId)
        {
            var entityToDelete = await GetByIdAsync(entityId);
            if (entityToDelete == null)
            {
                return false;
            }
            _dbSet.Remove(entityToDelete);
            await _applicationDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(QueryOptions queryOptions)
        {
            IQueryable<TEntity> query = _dbSet;
            if (!string.IsNullOrEmpty(queryOptions.SearchKeyword))
            {
                var searchableProperties = new[] { "Name", "Description" };

                var validProperties = searchableProperties
                    .Where(property => typeof(TEntity).GetProperty(property) != null)
                    .ToList();
                if (validProperties.Any())
                {
                    var orConditions = validProperties
                        .Select(property => $"{property}.Contians(@0)");

                    var combinedCondition = string.Join(" or ", orConditions);    
                    query = query.Where(combinedCondition, queryOptions.SearchKeyword);                
                }
            }

            var orderBy = $"{queryOptions.SortBy} {(queryOptions.SortDescending ? "desc" : "asc")}";
            query = query.OrderBy(orderBy);

            query = query.Skip((queryOptions.PageNumber - 1) * queryOptions.PageSize)
                .Take(queryOptions.PageSize);

            var entities = await query.ToListAsync();
            return entities;
        }

        public async Task<TEntity> GetByIdAsync(Guid entityId)
        {
           var entity = await _dbSet.FindAsync(entityId);
           return entity;
        }

        public async Task<TEntity> UpdateAsync(Guid entityId, TEntity updatedEntity)
        {
            var existingEntity = await GetByIdAsync(entityId);
            if (existingEntity == null) 
            {
                return null;
            }

            var entityProperties = typeof(TEntity).GetProperties();
            foreach (var property in entityProperties)
            {
                var newValue = property.GetValue(updatedEntity);
                if (newValue != null)
                {
                    property.SetValue(updatedEntity, newValue);
                }
            }
            try
            {
                await _applicationDbContext.SaveChangesAsync();
                return existingEntity;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while updating the entity.", ex);
            }
        }
    }
}