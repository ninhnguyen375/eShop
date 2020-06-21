using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CatalogApi.Data;
using CatalogApi.Domain.Models;
using CatalogApi.Domain.Services;
using CatalogApi.DTO.Response;
using Microsoft.EntityFrameworkCore;

namespace CatalogApi.Services
{
    public class ColorService : IColorService
    {
        private readonly AppDbContext _context;
        public ColorService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Color>> ListAsync()
        {
            var colors = await _context.Colors.OrderBy(c => c.Id).ToListAsync();
            return colors;
        }

        public async Task<Color> FindByIdAsync(int id)
        {
            var color = await _context.Colors.FindAsync(id);
            return color;
        }
        public async Task<Color> FindByHexCodeAsync(string hexCode)
        {
            var color = await _context.Colors.FirstOrDefaultAsync(c => c.HexCode == hexCode);
            return color;
        }
        public async Task CreateAsync(Color color)
        {
            await _context.Colors.AddAsync(color);
            await _context.SaveChangesAsync();
        }

        public Task DeleteAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task EditAsync(int id, Color color)
        {
            throw new System.NotImplementedException();
        }
    }
}