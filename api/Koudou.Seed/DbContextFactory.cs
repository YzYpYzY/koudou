using System.IO;
using Koudou.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Koudou.Data{
    public class DbContextFactory
    {
        public static KoudouContext CreateDbContext(bool isDockerized)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@Directory.GetCurrentDirectory() + "/api/Koudou.Seed/appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<KoudouContext>();
            string connectionString;
            if(isDockerized){
                connectionString = configuration.GetConnectionString("KoudouDockerizeConnection");
            } else {
                connectionString = configuration.GetConnectionString("KoudouConnection");
            }
            builder.UseNpgsql(
                connectionString);
            return new KoudouContext(builder.Options);
        }
    }
}
