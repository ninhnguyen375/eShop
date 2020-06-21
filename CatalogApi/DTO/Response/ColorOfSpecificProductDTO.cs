using System.Collections.Generic;
using CatalogApi.Domain.Models;

namespace CatalogApi.DTO.Response
{
    public class ColorOfSpecificProductDTO
    {
        public int Id { get; set; }
        public string SpecificProductId { get; set; }
        public string HexCode { get; set; }
    }
}