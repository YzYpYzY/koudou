using System.IO;
using Koudou.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Koudou.Data{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<KoudouContext>
    {
        public KoudouContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@Directory.GetCurrentDirectory() + "/appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<KoudouContext>();
            var connectionString = configuration.GetConnectionString("KoudouMigrationConnection");
            builder.UseNpgsql(
                connectionString,
                        x => x.MigrationsAssembly("Koudou.Data"));
            return new KoudouContext(builder.Options);
        }
    }
}
