using System.Collections.Generic;

namespace CartApi.Domain.Models
{
    public class Cart
    {
        public string Id { get; set; }

        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
        public Cart(string userId)
        {
            Id = userId;
        }
        public Cart() { }
    }
}