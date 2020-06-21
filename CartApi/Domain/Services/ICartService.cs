using System.Collections.Generic;
using System.Threading.Tasks;
using CartApi.Domain.Models;
using CartApi.Infrastructure.Constant;

namespace CartApi.Domain.Services
{
    public interface ICartService
    {
        Task<Cart> GetByAsync(string key);
        Task<Cart> UpdateAsync(string key, Cart cart);
        Task<bool> DeleteAsync(string key);
    }
}