using CatalogApi.Infrastructure.Constant;

namespace CatalogApi.DTO.Request
{
    public class CreateProductDTO
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Status { get; set; } = ProductStatus.New;
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public int StyleId { get; set; }
    }
}