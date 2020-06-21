using System;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using MessageTypes;
using Microsoft.EntityFrameworkCore;
using CatalogApi.Data;
using CatalogApi.Infrastructure.Constant;

namespace CatalogApi.Consumers
{
    public class ProductUpdateStock : IConsumer<ProductUpdateStockMessage>
    {
        readonly AppDbContext _context;
        public ProductUpdateStock(AppDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<ProductUpdateStockMessage> context)
        {
            var id = context.Message.SpecificProductId;
            var stock = context.Message.Stock;
            var specificProduct = await _context.SpecificProducts.FindAsync(id);
            if (specificProduct != null)
            {
                specificProduct.Stock = stock;
                await _context.SaveChangesAsync();
            }
        }
    }
}