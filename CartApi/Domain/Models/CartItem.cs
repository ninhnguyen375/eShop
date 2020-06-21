namespace CartApi.Domain.Models
{
    public class CartItem
    {
        public string SpecificProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Size { get; set; }
        public int Count { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; }
    }
}