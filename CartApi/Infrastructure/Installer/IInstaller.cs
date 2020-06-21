using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CartApi.Infrastructure.Installer
{
    public interface IInstaller
    {
        void InstallServices(IServiceCollection services, IConfiguration configuration);
    }
}