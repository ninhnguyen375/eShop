using System.Collections.Generic;
using System.Threading.Tasks;
using OrderApi.Domain.Models;
using OrderApi.DTO.Request;
using OrderApi.DTO.Response;
using OrderApi.Infrastructure.Constant;
using Stripe;
using Order = OrderApi.Domain.Models.Order;

namespace OrderApi.Domain.Services
{
    public interface IOrderService
    {
        Task<PagedList<Order>> ListAsync(SearchOrder search, Pagination pagination);
        Task<Order> CreateOrderAsync(CreateOrderDTO createOrder);
        Task<PaymentIntent> ApplyPaymentToOrder(Order order);
        Task<Order> FindByIdAsync(int id);
        Task AcceptOrderAsync(Order order);
        Task RejectOrderAsync(Order order, RejectOrderDTO rejectOrder);
        Task ApplyShipperAsync(ApplyShipperDTO applyShipper);
        Task DeliveredOrderAsync(Order order);
    }
}