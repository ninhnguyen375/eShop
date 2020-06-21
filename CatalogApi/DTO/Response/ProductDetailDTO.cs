using System.Collections.Generic;

namespace CatalogApi.DTO.Response
{
    public class ProductDetailDTO
    {
        public string Id { get; set; }
        public int Stock { get; set; }
        public double Price { get; set; }

        public int ProductId { get; set; }
        public int ColorId { get; set; }

        public virtual ProductDTO Product { get; set; }
        public virtual ColorDTO Color { get; set; }
        public virtual List<ProductDetailSizeDTO> ProductDetailSizes { get; set; }

        public virtual List<ImageDTO> Images { get; set; }
    }
}