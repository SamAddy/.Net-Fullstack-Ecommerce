namespace EcommerceBackend.Domain.src.Common
{
    public class PaginatedResponse<TEntity>
    {
        public IEnumerable<TEntity> Data { get; set; }
        public int TotalCount { get; set; }
    }
}