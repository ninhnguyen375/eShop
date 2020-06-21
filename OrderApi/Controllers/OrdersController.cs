using System.Linq;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using MessageTypes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OrderApi.Data;
using OrderApi.Domain.Models;
using OrderApi.Domain.Services;
using OrderApi.DTO.Request;
using OrderApi.DTO.Response;
using OrderApi.Infrastructure.Constant;
using Stripe;
using Order = OrderApi.Domain.Models.Order;
using OrderItem = OrderApi.Domain.Models.OrderItem;

namespace OrderApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        private readonly IBus _bus;

        public OrdersController(AppDbContext context, IOrderService orderService, IMapper mapper, IBus bus)
        {
            _context = context;
            _orderService = orderService;
            _mapper = mapper;
            _bus = bus;
        }

        [HttpGet]
        public async Task<ActionResult> GetOrders([FromQuery] SearchOrder search, [FromQuery] Pagination pagination)
        {
            var currentRequestId = User.Claims.First(claim => claim.Type == "sub").Value;

            if (User.IsInRole(Roles.Shipper))
            {
                search.ShipperId = currentRequestId;
            }

            var orders = await _orderService.ListAsync(search, pagination);
            var data = _mapper.Map<List<OrderDTO>>(orders);
            var list = new ListResponseDTO
            {
                Data = data,
                Count = orders.Count,
                CurrentPage = orders.CurrentPage,
                PageSize = orders.PageSize,
                TotalCount = orders.TotalCount,
                TotalPage = orders.TotalPages
            };

            return Ok(list);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Customer)]
        public async Task<ActionResult> CreateOrder([FromBody] CreateOrderDTO createOrder)
        {
            foreach (var orderItem in createOrder.OrderItems)
            {
                var product = await _context.Products.FindAsync(orderItem.ProductId);
                if (product == null)
                {
                    return BadRequest(new { ProductId = $"ProductId {orderItem.ProductId} not found".ToString() });
                };

                if (orderItem.Count > product.Stock)
                {
                    return BadRequest(new { Message = $"{orderItem.ProductName} is out of stock" });
                }
            }

            var createdOrder = await _orderService.CreateOrderAsync(createOrder);

            if (createOrder.PaymentType == PaymentTypes.OnlinePayment)
            {
                var paymentIntent = await _orderService.ApplyPaymentToOrder(createdOrder);
                return Ok(new
                {
                    clientSecret = paymentIntent.ClientSecret,
                    order = _mapper.Map<OrderDTO>(createdOrder)
                });
            }

            return Ok(new
            {
                order = _mapper.Map<OrderDTO>(createdOrder)
            });
        }

        [HttpPut("{id}/Accept")]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<ActionResult> AcceptOrder(int id)
        {
            var order = await _orderService.FindByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            await _orderService.AcceptOrderAsync(order);

            return NoContent();
        }

        [HttpPut("{id}/Delivered")]
        [Authorize(Roles = Roles.Shipper)]
        public async Task<ActionResult> DeliveredOrder(int id)
        {
            var order = await _orderService.FindByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            await _orderService.DeliveredOrderAsync(order);

            return NoContent();
        }

        [HttpPut("{id}/Reject")]
        [Authorize(Roles = Roles.Staff)]
        public async Task<ActionResult> RejectOrder(int id, [FromForm] RejectOrderDTO rejectOrder)
        {
            var order = await _orderService.FindByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            await _orderService.RejectOrderAsync(order, rejectOrder);

            return NoContent();
        }

        [HttpPost("ApplyShipper")]
        [Authorize(Roles = Roles.ManagerOrSeller)]
        public async Task<ActionResult> ApplyShipper(int id, [FromForm] ApplyShipperDTO applyShipper)
        {
            foreach (var orderId in applyShipper.OrderIds)
            {
                var order = await _orderService.FindByIdAsync(orderId);
                if (order == null)
                {
                    return NotFound($"Order {orderId} not exist!".ToString());
                }
            }

            await _orderService.ApplyShipperAsync(applyShipper);
            return NoContent();
        }
    }
}