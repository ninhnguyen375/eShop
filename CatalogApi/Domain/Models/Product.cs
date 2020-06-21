using System.Collections.Generic;
using CatalogApi.Infrastructure.Constant;

namespace CatalogApi.Domain.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Status { get; set; } = ProductStatus.New;
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public int StyleId { get; set; }
        public virtual Category Category { get; set; }
        public virtual Style Style { get; set; }

        public virtual List<SpecificProduct> SpecificProducts { get; set; }
    }
}