using System.Collections.Generic;
using CatalogApi.Domain.Models;
using CatalogApi.Infrastructure.Constant;

namespace CatalogApi.DTO.Response
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public int StyleId { get; set; }
        public virtual CategoryDTO Category { get; set; }
        public virtual StyleDTO Style { get; set; }
    }
}