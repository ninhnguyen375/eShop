using GreenPipes;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PaymentApi.Services;

namespace PaymentApi.Infrastructure.Installer
{
    public class MasstransitInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            // Consumer dependencies should be scoped
            // services.AddScoped<CreateOrderConsumer> ();
            
            services.AddMassTransit (x => {
                // x.AddConsumer<CreateOrderConsumer> ();

                x.AddBus (context => Bus.Factory.CreateUsingRabbitMq (cfg => {
                    cfg.Host ("rabbitmq://localhost", h => { h.Username ("guest"); h.Password ("guest"); });

                    cfg.ReceiveEndpoint ("payment-api", ep => {
                        ep.PrefetchCount = 16;
                        ep.UseMessageRetry (r => r.Interval (2, 100));
                        // ep.ConfigureConsumer<CreateOrderConsumer> (context);
                    });
                }));
            });

            services.AddHostedService<BusService> ();

            services.AddMassTransitHostedService ();
        }
    }
}