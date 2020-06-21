namespace CatalogApi.Domain.Models
{
    public class Image
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public string Url { get; set; }
        public bool IsDefault { get; set; } = false;

        public virtual Color Color { get; set; }
    }
}