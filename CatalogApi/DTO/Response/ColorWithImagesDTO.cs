using System.Collections.Generic;
using CatalogApi.Domain.Models;

namespace CatalogApi.DTO.Response
{
    public class ColorWithImagesDTO
    {
        public int Id { get; set; }
        public string HexCode { get; set; }
        public virtual List<ImageDTO> Images { get; set; }
    }
}