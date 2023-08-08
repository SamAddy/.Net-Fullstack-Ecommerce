using EcommerceBackend.Business.src.Services.Abstractions;
using Ganss.Xss;

namespace EcommerceBackend.Business.src.Services.Implementations
{
    public class SanitizerService : ISanitizerService
    {
        private readonly IHtmlSanitizer _htmlSanitizer;

        public SanitizerService()
        {
            _htmlSanitizer = new HtmlSanitizer();
        }
        public string SanititzeHtml(string input)
        {
            return _htmlSanitizer.Sanitize(input);
        }

        public T SanitizeDto<T>(T inputDto)
        {
            var properties = typeof(T).GetProperties();
            foreach (var property in properties)
            {
                if(property.PropertyType == typeof(string) && property.Name.ToLower() != "password")
                {
                    var value = property.GetValue(inputDto) as string;
                    if (value != null)
                    {
                        var sanitizedValue = SanititzeHtml(value);
                        property.SetValue(inputDto, sanitizedValue);
                    }
                }
            }
            return inputDto;
        }
    }
}