using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Koudou.Api.Business.Exceptions;
using Koudou.Data;
using Koudou.Api.Business;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
using Koudou.Api.Models.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Koudou.Api
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
            services.AddDbContext<KoudouContext>(options => options.UseNpgsql(
                Configuration.GetConnectionString("KoudouConnection"),
                x => x.MigrationsAssembly("Koudou.Data")
            ));
            services.AddApiVersioning(x =>  
            {  
                x.DefaultApiVersion = new ApiVersion(1, 0);  
                x.AssumeDefaultVersionWhenUnspecified = true;  
                x.ReportApiVersions = true;  
            });  
            services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });
            ConfigureAuthentication(services);
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
                app.UseExceptionHandler(HandleError);
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
                Flows = new OpenApiOAuthFlows()
                {

                    Password = new OpenApiOAuthFlow()
                    {
                        Scopes = new Dictionary<string, string>
                        {
                            {"koudou-api", "Koudou WebAPI"}
                        },
                        TokenUrl = "/api/v1/auth/Token",
                        AuthorizationUrl = "/api/v1/auth/Token",
                    }
                }
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

        private void ConfigureAuthentication(IServiceCollection services)
        {
            var tokensConfiguration = Configuration.GetSection("Tokens");
            var tokenSettings = tokensConfiguration.Get<TokensSettings>();

            services.Configure<TokensSettings>(tokensConfiguration);

            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.Secret)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = true
                    };
                });
        }

        private void HandleError(IApplicationBuilder error)
        {
            error.Run(async context =>
                    {
                        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                        var exception = exceptionHandlerPathFeature?.Error as RequestException;

                        if (exception != null)
                        {
                            // TODO: Log RequestException

                            var json = exception.GetJson();
                            context.Response.ContentType = "application/json";
                            context.Response.StatusCode = exception.StatusCode;
                            await context.Response.WriteAsync(json);
                        }
                    });
        }
    }
}
