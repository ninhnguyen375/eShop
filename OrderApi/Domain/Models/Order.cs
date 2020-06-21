using System;
using System.Collections.Generic;
namespace OrderApi.Domain.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public double TotalPrice { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PaymentIntentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
        public string RejectReason { get; set; }
        public string ShipperId { get; set; }
        public string PaymentType { get; set; }

        public virtual List<OrderItem> OrderItems { get; set; }
    }
}