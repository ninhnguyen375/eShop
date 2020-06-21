namespace CatalogApi.DTO.Response
{
    public class SizeOfSpecificProductDTO
    {
        public int Id { get; set; }
        public string SpecificProductId { get; set; }
        public string SizeValue { get; set; }
        public int Stock { get; set; }
    }
}