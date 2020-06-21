using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace ApiGateway {
    public class Program {
        public static void Main (string[] args) {
            CreateWebHostBuilder (args).Build ().Run ();
        }

        public static IWebHostBuilder CreateWebHostBuilder (string[] args) =>
            new WebHostBuilder ()
            .UseKestrel ()
            .UseContentRoot (Directory.GetCurrentDirectory ())
            .ConfigureAppConfiguration ((hostingContext, config) => {
                config
                    .SetBasePath (hostingContext.HostingEnvironment.ContentRootPath)
                    .AddJsonFile ("appsettings.json", true, true)
                    .AddJsonFile ($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                    .AddJsonFile ("ocelot.json")
                    .AddEnvironmentVariables ();
            })
            .ConfigureServices (s => {
                s.AddOcelot ();
                s.AddCors (opt => {
                    opt.AddPolicy ("default", builder => {
                        builder.AllowAnyOrigin ();
                        builder.AllowAnyHeader ();
                        builder.AllowAnyMethod ();
                    });
                });
            })
            .ConfigureLogging ((hostingContext, logging) => {
                //Todo: add logging
            })
            .UseIISIntegration ()
            .Configure (app => {
                app.UseCors ("default");
                app.UseOcelot ().Wait ();
            });

    }
}