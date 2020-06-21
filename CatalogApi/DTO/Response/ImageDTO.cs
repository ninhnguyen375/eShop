namespace CatalogApi.DTO.Response
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public string Url { get; set; }
        public bool IsDefault { get; set; }
    }
}