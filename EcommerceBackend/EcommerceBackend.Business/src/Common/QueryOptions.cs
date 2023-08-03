namespace EcommerceBackend.Business.src.Common
{
    public class QueryOptions
    {
        public string? SearchKeyword { get; set; } = null;
        public string SortBy { get; set; } = "UpdateAt";
        public bool SortDescending { get; set;} = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set;} = 10;
    }
}