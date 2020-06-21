using System.Collections.Generic;

namespace CatalogApi.DTO.Response
{
    public class SpecificProductDTO
    {
        public string Id { get; set; }
        public int Stock { get; set; }
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }

        public virtual ProductDTO Product { get; set; }
        public virtual ColorWithImagesDTO Color { get; set; }
        public virtual SizeDTO Size { get; set; }

        // for response data
        public List<ImageDTO> Images { get; set; }
    }
}