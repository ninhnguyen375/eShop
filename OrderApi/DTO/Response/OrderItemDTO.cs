namespace OrderApi.DTO.Response
{
    public class OrderItemDTO
    {
        public string ProductId { get; set; }
        public int OrderId { get; set; }
        public int Count { get; set; }
        public double ProductPrice { get; set; }
        public string ProductName { get; set; }
        public string ProductSize { get; set; }
        public string ImageUrl { get; set; }

        public virtual ProductDTO Product { get; set; }
    }
}