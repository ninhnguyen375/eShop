using System.Collections.Generic;
using System.Threading.Tasks;
using CatalogApi.Domain.Models;

namespace CatalogApi.Domain.Services
{
    public interface IStyleService
    {
        Task<List<Style>> ListAsync();
        Task<Style> FindByNameAsync(string name);
        Task CreateAsync(Style style);
        Task EditAsync(int id, Style style);
        Task DeleteAsync();
    }
}