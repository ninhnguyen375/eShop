using System.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CartApi.Domain.Models;
using CartApi.Domain.Services;
using CartApi.Infrastructure.Constant;
using StackExchange.Redis;
using Newtonsoft.Json;

namespace CartApi.Services
{
    public class CartService : ICartService
    {
        private readonly IDatabase _database;

        public CartService(IDatabase database)
        {
            _database = database;
        }

        public async Task<Cart> GetByAsync(string key)
        {
            var data = await _database.StringGetAsync(key);

            return data.IsNullOrEmpty
                ? null
                : JsonConvert.DeserializeObject<Cart>(data);
        }

        public async Task<Cart> UpdateAsync(string key, Cart cart)
        {
            var data = JsonConvert.SerializeObject(cart);
            var created = await _database.StringSetAsync(key, data);
            return created ? await GetByAsync(key) : null;
        }

        public async Task<bool> DeleteAsync(string key)
        {
            return await _database.KeyDeleteAsync(key);
        }
    }
}