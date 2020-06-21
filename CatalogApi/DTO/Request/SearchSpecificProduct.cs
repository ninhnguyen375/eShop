namespace CatalogApi.DTO.Request
{
    public class SearchSpecificProduct
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int CategoryId { get; set; }
        public int StyleId { get; set; }
    }
}