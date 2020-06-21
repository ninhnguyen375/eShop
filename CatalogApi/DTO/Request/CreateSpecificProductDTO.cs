using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace CatalogApi.DTO.Request
{
    public class CreateSpecificProductDTO
    {
        public int ColorId { get; set; }
        public List<int> sizeIds { get; set; }
        public virtual List<IFormFile> Images { get; set; }
    }
}