using System;
using System.Security.Cryptography;

namespace Koudou.Security
{
    public static class Tokens
    {
        public static Guid GenerateRandomToken()
        {
            using (var provider = new RNGCryptoServiceProvider())
            {
                var bytes = new byte[16];
                provider.GetBytes(bytes);
                return new Guid(bytes);
            }
        }
    }
}