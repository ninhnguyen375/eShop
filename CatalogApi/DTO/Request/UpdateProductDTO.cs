namespace CatalogApi.DTO.Request
{
    public class UpdateProductDTO
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public int StyleId { get; set; }
    }
}