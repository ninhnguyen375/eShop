using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace CartApi.Infrastructure.Installer
{
    public class DbInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            IConnectionMultiplexer redis = ConnectionMultiplexer.Connect(
                configuration.GetConnectionString("DefaultConnection")
            );
            services.AddSingleton(s => redis.GetDatabase());
        }
    }
}