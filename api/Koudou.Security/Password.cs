using System;
using System.Security.Cryptography;
using Scrypt;

namespace Koudou.Security
{
    public class Password
    {
        private const int DefaultIterationCount = 16384;
        private const int DefaultBlockSize = 8;
        private const int DefaultThreadCount = 1;

        public static string GetUniqueKey(int length = 32, string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
        {
            using (var crypto = new RNGCryptoServiceProvider())
            {
                var data = new byte[length];

                // If chars.Length isn't a power of 2 then there is a bias if
                // we simply use the modulus operator. The first characters of
                // chars will be more probable than the last ones.

                // buffer used if we encounter an unusable random byte. We will
                // regenerate it in this buffer
                byte[] smallBuffer = null;

                // Maximum random number that can be used without introducing a
                // bias
                int maxRandom = byte.MaxValue - ((byte.MaxValue + 1) % chars.Length);

                crypto.GetBytes(data);

                var result = new char[length];

                for (int i = 0; i < length; i++)
                {
                    byte v = data[i];

                    while (v > maxRandom)
                    {
                        if (smallBuffer == null)
                        {
                            smallBuffer = new byte[1];
                        }

                        crypto.GetBytes(smallBuffer);
                        v = smallBuffer[0];
                    }

                    result[i] = chars[v % chars.Length];
                }

                return new string(result);
            }
        }

        public static string Encode(string password, string pepper = "", int iterationCount = DefaultIterationCount, int blockSize = DefaultBlockSize, int threadCount = DefaultThreadCount)
        {
            var encoder = new ScryptEncoder(iterationCount, blockSize, threadCount);
            return encoder.Encode(pepper + password);
        }

        public static bool Compare(string hashedPassword, string password, string pepper = "", int iterationCount = DefaultIterationCount, int blockSize = DefaultBlockSize, int threadCount = DefaultThreadCount)
        {
            var encoder = new ScryptEncoder(iterationCount, blockSize, threadCount);
            return encoder.Compare(pepper + password, hashedPassword);
        }

        public static string Generate(string pepper = "", int iterationCount = DefaultIterationCount, int blockSize = DefaultBlockSize, int threadCount = DefaultThreadCount)
        {
            return Encode(GetUniqueKey(), pepper, iterationCount, blockSize, threadCount);
        }
    }
}
