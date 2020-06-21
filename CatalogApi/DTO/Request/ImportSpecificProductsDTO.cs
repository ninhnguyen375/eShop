using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CatalogApi.DTO.Request
{
    public class ImportSpecificProductsDTO
    {
        public List<ImportSpecificProductItem> Items { get; set; }
    }

    public class ImportSpecificProductItem
    {
        [Required]
        public string SpecificProductId { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}