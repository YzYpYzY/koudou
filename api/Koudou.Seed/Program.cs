using System;
using Koudou.Data;
using Serilog;

namespace Koudou.Seed
{
    class Program
    {
        static void Main(string[] args)
        {
            var isDockerized = args.Length > 0 ? args[0] == "dockerize" : false;
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.File($"logs/koudou-seed-{DateTime.Now.ToShortDateString().Replace("/", "-")}.txt")
                .CreateLogger();
            try
            {
                var context = DbContextFactory.CreateDbContext(isDockerized);
                Log.Logger.Information("Seeding database.");
                var importHelper = new ImportHelper(context, Log.Logger);
                importHelper.Seed();
                Log.Logger.Information("Database seeded.");
            }
            catch (Exception ex)
            {
                Log.Logger.Error(ex, "An error occurred while seeding the database.");
            }
        }
    }
}
