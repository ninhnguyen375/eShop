using System.Collections.Generic;
using OrderApi.Domain.Models;
using OrderApi.Infrastructure.Constant;

namespace OrderApi.DTO.Request
{
    public class CreateOrderDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Status { get; set; } = OrderStatus.New;
        public string PaymentType { get; set; } = PaymentTypes.CashOnDelivery;
        public virtual List<OrderItem> OrderItems { get; set; }
    }
}