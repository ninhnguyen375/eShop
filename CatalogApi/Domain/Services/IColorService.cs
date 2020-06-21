using System.Collections.Generic;
using System.Threading.Tasks;
using CatalogApi.Domain.Models;

namespace CatalogApi.Domain.Services
{
    public interface IColorService
    {
        Task<List<Color>> ListAsync();
        Task<Color> FindByIdAsync(int id);
        Task<Color> FindByHexCodeAsync(string hexCode);
        Task CreateAsync(Color color);
        Task EditAsync(int id, Color color);
        Task DeleteAsync();
    }
}