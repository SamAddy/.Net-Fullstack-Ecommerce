using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace EcommerceBackend.Domain.src.Common
{
    public class Validator
    {
        public static bool IsValidURL(string url)
        {
            string pattern = @"^(http|https)://[\w\-.]+(:\d+)?(/([\w/_\.]*(\?\S+)?)?)?$";
            Regex Rgx = new Regex(pattern, RegexOptions.Compiled | RegexOptions.IgnoreCase);
            return Rgx.IsMatch(url);
        }

        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try 
            {
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                    RegexOptions.None, TimeSpan.FromMilliseconds(1000));

                string DomainMapper(Match match)
                {
                    var idn = new IdnMapping();
                    string domainName = idn.GetAscii(match.Groups[2].Value);
                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
            catch (ArgumentException)
            {
                return false;
            }
            
            try 
            {
                return Regex.IsMatch(email, 
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMicroseconds(500));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }
    }
}