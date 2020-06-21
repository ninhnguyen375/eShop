using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CatalogApi.Data;
using CatalogApi.Domain.Models;
using CatalogApi.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace CatalogApi.Services
{
    public class StyleService : IStyleService
    {
        private readonly AppDbContext _context;

        public StyleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Style>> ListAsync()
        {
            var styles = await _context.Styles.AsNoTracking().OrderBy(s => s.Id).ToListAsync();
            return styles;
        }

        public async Task<Style> FindByNameAsync(string name)
        {
            var style = await _context.Styles.AsNoTracking().FirstOrDefaultAsync(s => s.Name == name);
            // var style = await _context.Styles.FindAsync(1);
            return style;
        }


        public async Task CreateAsync(Style style)
        {
            await _context.Styles.AddAsync(style);
            await _context.SaveChangesAsync();
        }

        public Task EditAsync(int id, Style style)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}