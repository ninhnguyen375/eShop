using System.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderApi.Data;
using OrderApi.Domain.Models;
using OrderApi.Domain.Services;
using OrderApi.DTO.Request;
using OrderApi.DTO.Response;
using OrderApi.Infrastructure.Constant;
using Stripe;
using OrderItem = OrderApi.Domain.Models.OrderItem;
using MassTransit;
using MessageTypes;
using Order = OrderApi.Domain.Models.Order;
using System.Globalization;

namespace OrderApi.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly IBus _bus;
        public OrderService(AppDbContext context, IBus bus)
        {
            _context = context;
            _bus = bus;
        }
        public async Task<PagedList<Order>> ListAsync(SearchOrder search, Pagination pagination)
        {
            var queryable = _context.Orders.AsQueryable();

            if (!string.IsNullOrEmpty(search.UserId))
            {
                queryable = queryable.Where(x => x.UserId == search.UserId);
            }
            if (!string.IsNullOrEmpty(search.ShipperId) && search.ShipperId != "isNullOrEmpty")
            {
                queryable = queryable.Where(x => x.ShipperId == search.ShipperId);
            }
            if (search.ShipperId == "isNullOrEmpty")
            {
                queryable = queryable.Where(x => string.IsNullOrEmpty(x.ShipperId));
            }
            if (!string.IsNullOrEmpty(search.Email))
            {
                queryable = queryable.Where(x => x.Email.Contains(search.Email));
            }
            if (search.Id != 0)
            {
                queryable = queryable.Where(x => x.Id == search.Id);
            }
            if (!string.IsNullOrEmpty(search.Status))
            {
                queryable = queryable.Where(x => x.Status == search.Status);
            }

            // selector
            if (search.SelectStatus != null)
            {
                queryable = queryable.Where(x => search.SelectStatus.Contains(x.Status));
            }

            // sorter
            if (pagination.SortAsc == "CreatedAt")
            {
                queryable = queryable.OrderBy(x => x.CreatedAt);
            }
            if (pagination.SortDesc == "CreatedAt")
            {
                queryable = queryable.OrderByDescending(x => x.CreatedAt);
            }
            if (pagination.SortAsc == "Status")
            {
                queryable = queryable.OrderBy(x => x.Status);
            }
            if (pagination.SortDesc == "Status")
            {
                queryable = queryable.OrderByDescending(x => x.Status);
            }

            var pagedList = await PagedList<Order>.ToPagedListAsync(queryable, pagination.PageNumber, pagination.PageSize);
            return pagedList;
        }

        public async Task<Order> CreateOrderAsync(CreateOrderDTO createOrder)
        {
            StripeConfiguration.ApiKey = "sk_test_9lbV8iZ2EjD5TiOzTAFURm7H00TCPFae4M";
            List<OrderItem> orderItemsToAdd = new List<OrderItem>();
            double totalPrice = 0;

            foreach (var orderItem in createOrder.OrderItems)
            {
                var product = await _context.Products.FindAsync(orderItem.ProductId);

                product.Stock -= orderItem.Count;
                await _bus.Publish(new ProductUpdateStockMessage
                {
                    SpecificProductId = product.Id,
                    Stock = product.Stock
                });

                totalPrice += product.Price * orderItem.Count;

                orderItemsToAdd.Add(
                    new OrderItem
                    {
                        Count = orderItem.Count,
                        ProductId = product.Id,
                        ProductName = orderItem.ProductName,
                        ProductPrice = product.Price,
                        ProductSize = orderItem.ProductSize,
                        ImageUrl = orderItem.ImageUrl
                    }
                );
            }
            var order = new Order
            {
                UserId = createOrder.UserId,
                Address = createOrder.Address,
                CreatedAt = DateTime.UtcNow.AddHours(7),
                Email = createOrder.Email,
                UserName = createOrder.UserName,
                PhoneNumber = createOrder.PhoneNumber,
                TotalPrice = totalPrice,
                OrderItems = orderItemsToAdd,
                Status = OrderStatus.New,
                PaymentType = createOrder.PaymentType
            };
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<PaymentIntent> ApplyPaymentToOrder(Order order)
        {
            var options = new PaymentIntentCreateOptions
            {
                Currency = "vnd",
                Amount = (long?)order.TotalPrice
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);

            order.PaymentIntentId = paymentIntent.Id;
            await _context.SaveChangesAsync();

            return paymentIntent;
        }

        public async Task<Order> FindByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task AcceptOrderAsync(Order order)
        {
            order.Status = OrderStatus.Accepted;
            await _context.SaveChangesAsync();
        }

        public async Task RejectOrderAsync(Order order, RejectOrderDTO rejectOrder)
        {
            order.Status = OrderStatus.Rejected;
            order.RejectReason = rejectOrder.RejectReason;

            foreach (var orderItem in order.OrderItems)
            {
                var specificProduct = await _context.Products.FindAsync(orderItem.ProductId);
                if (specificProduct == null) continue;

                var newStock = specificProduct.Stock + orderItem.Count;

                specificProduct.Stock = newStock;

                await _context.SaveChangesAsync();
                await _bus.Publish(new ProductUpdateStockMessage
                {
                    SpecificProductId = specificProduct.Id,
                    Stock = newStock
                });
            }

            await _context.SaveChangesAsync();
        }

        public async Task ApplyShipperAsync(ApplyShipperDTO applyShipper)
        {
            foreach (var orderId in applyShipper.OrderIds)
            {
                var order = await FindByIdAsync(orderId);
                order.ShipperId = applyShipper.ShipperId;
                order.Status = OrderStatus.Delivering;
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeliveredOrderAsync(Order order)
        {
            order.Status = OrderStatus.Done;
            await _context.SaveChangesAsync();
        }
    }
}