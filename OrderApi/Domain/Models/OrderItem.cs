namespace OrderApi.Domain.Models
{
    public class OrderItem
    {
        public string ProductId { get; set; }
        public int OrderId { get; set; }
        public double ProductPrice { get; set; }
        public int Count { get; set; }
        public string ProductName { get; set; }
        public string ProductSize { get; set; }
        public string ImageUrl { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}