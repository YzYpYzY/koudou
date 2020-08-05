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
            return Encode(RandomGenerator.GetUniqueKey(), pepper, iterationCount, blockSize, threadCount);
        }
    }
}
