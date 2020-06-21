using System.Collections.Generic;
using System.Threading.Tasks;
using CatalogApi.Domain.Models;

namespace CatalogApi.Domain.Services
{
    public interface ISizeService
    {
        Task<List<Size>> ListAsync();
        Task CreateAsync(Size size);
        Task EditAsync(int id, Size size);
        Task<Size> FindByValueAsync(string sizeValue);
        Task<Size> FindByIdAsync(int id);
        Task DeleteAsync();
    }
}