using System.Collections.Generic;

namespace OrderApi.Domain.Models
{
    public class Product
    {
        public string Id { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public virtual List<OrderItem> OrderItems { get; set; }
    }
}