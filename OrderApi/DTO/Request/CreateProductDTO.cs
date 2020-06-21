namespace OrderApi.DTO.Request
{
    public class CreateProductDTO
    {
        public string Id { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; } = 0;
    }
}