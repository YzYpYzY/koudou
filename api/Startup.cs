using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using koudouApi.Data;
using KoudouApi.Business;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NSwag;
using NSwag.Generation.AspNetCore;
using NSwag.Generation.Processors.Security;

namespace koudouApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<KoudouContext>(options =>options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });
            services.AddOpenApiDocument(config =>
            {
                ConfigureSwagger(config);
            });

            
            services.AddCors(options =>
            {
                options.AddPolicy("All",
                builder => builder.AllowAnyOrigin().AllowAnyHeader());
            });

            // Business logic
            var businessTypes = GetType().Assembly.GetTypes()
                .Where(myType =>
                    myType.IsClass
                    && !myType.IsAbstract
                    && myType.IsSubclassOf(typeof(LogicBase)))
                .ToList();
            businessTypes.ForEach(bt => services.AddScoped(bt));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("All"); 

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureSwagger(AspNetCoreOpenApiDocumentGeneratorSettings config)
        {
            config.AddSecurity("bearer", Enumerable.Empty<string>(), new OpenApiSecurityScheme
            {
                Type = OpenApiSecuritySchemeType.OAuth2,
                Description = "Koudou Authentication",
                Flow = OpenApiOAuth2Flow.Password,
                // Flows = new OpenApiOAuthFlows()
                // {

                //     Password = new OpenApiOAuthFlow()
                //     {
                //         Scopes = new Dictionary<string, string>
                //                    {
                //                         {Security.Scope, "Koudou WebAPI"}
                //                    },
                //         TokenUrl = "/api/authentication/Token",
                //         AuthorizationUrl = "/authentication/Token",
                //     }
                // }
            });
            config.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("bearer"));

            config.PostProcess = document =>
            {
                document.Info.Title = "Koudou api";
                document.Info.Description = "API description";
                document.Info.Version = "Version 1.0";
            };

            config.GenerateEnumMappingDescription = true;
        }
    }
}
