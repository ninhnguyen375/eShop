using System;
using System.Globalization;
using System.Linq;
using OrderApi.Domain.Models;
using OrderApi.Infrastructure.Constant;

namespace OrderApi.Data
{
    public class Seed
    {
        private readonly AppDbContext _context;

        public Seed(AppDbContext context)
        {
            _context = context;
        }

        public static void Initialize(AppDbContext context)
        {
            if (context == null)
                return;
            // Seeding order
            if (!context.Orders.Any())
            {
                context.Orders.AddRange(
                    new Order
                    {
                        Id = 1,
                        UserId = "e277af94-cb4d-46c0-8f55-65ba0a20a191",
                        Address = "address1",
                        CreatedAt = DateTime.ParseExact("22:23 19/06/2020", "HH:mm dd/MM/yyyy", CultureInfo.InvariantCulture),
                        Email = "customer1@gmail.com",
                        PaymentIntentId = "pi_xxx",
                        PhoneNumber = "0123456789",
                        Status = OrderStatus.Paid,
                        TotalPrice = 1400000,
                        UserName = "customer1",
                        PaymentType = PaymentTypes.OnlinePayment
                    }
                );
            }
            // Seeding orderItem
            if (!context.OrderItems.Any())
            {
                context.OrderItems.AddRange(
                    new OrderItem
                    {
                        ProductId = "P1C1S25",
                        OrderId = 1,
                        Count = 2,
                        ProductPrice = 1400000,
                        ProductName = "BASAS NEW FAMILIAR",
                        ProductSize = "25",
                        ImageUrl = "/seed-images/P1C1_ramdom2.jpg"
                    }
                );
            }
            // Seeding Product
            if (!context.Products.Any())
            {
                context.AddRange(
                    new Product { Id = "P1C1S25", Price = 700000, Stock = 50 },
                    new Product { Id = "P1C1S26", Price = 700000, Stock = 50 },
                    new Product { Id = "P1C2S25", Price = 700000, Stock = 30 },
                    new Product { Id = "P2C1S25", Price = 800000, Stock = 40 },
                    new Product { Id = "P2C2S26", Price = 800000, Stock = 50 }
                );
            }

            context.SaveChanges();
        }
    }
}