using System.Text;

namespace EcommerceBackend.Business.src.Services.Common
{
    public class PasswordService
    {
        public static string  HashPassword(string password)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            byte [] hashedPasswordBytes = Encoding.UTF8.GetBytes(hashedPassword);
            return Convert.ToBase64String(hashedPasswordBytes);
        }
        
        public static bool VerifyPassword(string passwordHash, string providedPassword)
        {
            byte[] hashedPasswordBytes = Convert.FromBase64String(passwordHash);
            string hashedPassword = Encoding.UTF8.GetString(hashedPasswordBytes);
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }
    }
}