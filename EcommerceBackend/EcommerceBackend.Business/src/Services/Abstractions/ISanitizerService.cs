namespace EcommerceBackend.Business.src.Services.Abstractions
{
    public interface ISanitizerService
    {
        string SanititzeHtml(string input);
        T SanitizeDto<T>(T inputDto);
    }
}