using System;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using MessageTypes;
using Microsoft.EntityFrameworkCore;
using OrderApi.Data;
using OrderApi.Infrastructure.Constant;

namespace OrderApi.Consumers
{
    public class ImportSpecificProduct : IConsumer<ImportSpecificProductMessage>
    {
        readonly AppDbContext _context;
        public ImportSpecificProduct(AppDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<ImportSpecificProductMessage> context)
        {
            var id = context.Message.SpecificProductId;
            var stock = context.Message.Stock;
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                product.Stock = stock;
                await _context.SaveChangesAsync();
            }
        }
    }
}