using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koudou.Data;
using Koudou.Data.Imports;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Koudou.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                var loggerForImport = services.GetRequiredService<ILogger<ImportHelper>>();
                try
                {
                    var context = services.GetRequiredService<KoudouContext>();
                    var isDbEmpty = true; //context.Sections.FirstOrDefault() == null;
                    if (isDbEmpty)
                    {
                        logger.LogInformation("Seeding database.");

                        var importHelper = new ImportHelper(context,loggerForImport);
                        importHelper.Seed();
                    }
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.AddFile("logs/koudou-api-{Date}.txt");
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
