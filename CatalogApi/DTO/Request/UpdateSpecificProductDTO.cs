using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace CatalogApi.DTO.Request
{
    public class UpdateSpecificProductDTO
    {
        public int ColorId { get; set; }
        public int SizeId { get; set; }

        public List<UpdateImageDTO> images { get; set; }
    }

    public class UpdateImageDTO
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsDefault { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}