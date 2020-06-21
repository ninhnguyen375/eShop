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
    public class PaymentOrderSuccess : IConsumer<PaymentOrderSuccessMessage>
    {
        readonly AppDbContext _context;
        public PaymentOrderSuccess(AppDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<PaymentOrderSuccessMessage> context)
        {
            var paymentIntentId = context.Message.PaymentIntentId;
            var order = await _context.Orders.FirstOrDefaultAsync(
                x => x.PaymentIntentId == paymentIntentId);
            if (order != null)
            {
                order.Status = OrderStatus.Paid;
                await _context.SaveChangesAsync();
            }
        }
    }
}