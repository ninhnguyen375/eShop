using GreenPipes;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CatalogApi.Consumers;
using CatalogApi.Services;

namespace CatalogApi.Infrastructure.Installer
{
    public class MasstransitInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            // Consumer dependencies should be scoped
            services.AddScoped<ProductUpdateStock> ();
            
            services.AddMassTransit (x => {
                x.AddConsumer<ProductUpdateStock> ();

                x.AddBus (context => Bus.Factory.CreateUsingRabbitMq (cfg => {
                    cfg.Host ("rabbitmq://localhost", h => { h.Username ("guest"); h.Password ("guest"); });

                    cfg.ReceiveEndpoint ("catalog-api", ep => {
                        ep.PrefetchCount = 16;
                        ep.UseMessageRetry (r => r.Interval (2, 100));
                        ep.ConfigureConsumer<ProductUpdateStock> (context);
                    });
                }));
            });

            services.AddHostedService<BusService> ();

            services.AddMassTransitHostedService ();
        }
    }
}