using GreenPipes;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OrderApi.Consumers;
using OrderApi.Services;

namespace OrderApi.Infrastructure.Installer
{
    public class MasstransitInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            // Consumer dependencies should be scoped
            services.AddScoped<PaymentOrderSuccess>();
            services.AddScoped<CreateSpecificProduct>();
            services.AddScoped<ImportSpecificProduct>();

            services.AddMassTransit(x =>
            {
                x.AddConsumer<PaymentOrderSuccess>();
                x.AddConsumer<CreateSpecificProduct>();
                x.AddConsumer<ImportSpecificProduct>();

                x.AddBus(context => Bus.Factory.CreateUsingRabbitMq(cfg =>
                {
                    cfg.Host("rabbitmq://localhost", h => { h.Username("guest"); h.Password("guest"); });

                    cfg.ReceiveEndpoint("order-api", ep =>
                    {
                        ep.PrefetchCount = 16;
                        ep.UseMessageRetry(r => r.Interval(2, 100));
                        ep.ConfigureConsumer<PaymentOrderSuccess>(context);
                        ep.ConfigureConsumer<CreateSpecificProduct>(context);
                        ep.ConfigureConsumer<ImportSpecificProduct>(context);
                    });
                }));
            });

            services.AddHostedService<BusService>();

            services.AddMassTransitHostedService();
        }
    }
}