using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CatalogApi.Data;
using CatalogApi.Domain.Models;
using CatalogApi.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace CatalogApi.Services
{
    public class SizeService : ISizeService
    {
        private readonly AppDbContext _context;

        public SizeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Size>> ListAsync()
        {
            var sizes = await _context.Sizes.AsNoTracking().OrderBy(s => s.SizeValue).ToListAsync();

            return sizes;
        }

        public async Task CreateAsync(Size size)
        {
            await _context.Sizes.AddAsync(size);
            await _context.SaveChangesAsync();
        }

        public async Task<Size> FindByIdAsync(int id)
        {
            return await _context.Sizes.FindAsync(id);
        }

        public async Task<Size> FindByValueAsync(string sizeValue)
        {
            return await _context.Sizes.AsNoTracking().FirstOrDefaultAsync(x => x.SizeValue == sizeValue);
        }

        public async Task EditAsync(int id, Size size)
        {
            var s = await _context.Sizes.FindAsync(id);
            if (s != null)
            {
                s.SizeValue = size.SizeValue;
            }
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}