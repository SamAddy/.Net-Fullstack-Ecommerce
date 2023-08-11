using System.Text.Json.Serialization;

namespace EcommerceBackend.Domain.src.Entities
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserRole
    {
        Customer,
        Admin
    }
}