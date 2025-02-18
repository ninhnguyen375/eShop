using System.Collections.Generic;

namespace CatalogApi.Domain.Models
{
    public class Style
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}