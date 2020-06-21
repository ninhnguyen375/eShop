using System;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using MessageTypes;
using Microsoft.EntityFrameworkCore;
using OrderApi.Data;
using OrderApi.Domain.Models;
using OrderApi.Infrastructure.Constant;

namespace OrderApi.Consumers
{
    public class CreateSpecificProduct : IConsumer<CreateSpecificProductMessage>
    {
        readonly AppDbContext _context;
        public CreateSpecificProduct(AppDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<CreateSpecificProductMessage> context)
        {
            var spc = context.Message;
            var product = new Product
            {
                Id = spc.Id,
                Price = spc.Price,
                Stock = spc.Stock
            };
            await _context.AddAsync(product);
            await _context.SaveChangesAsync();
        }
    }
}