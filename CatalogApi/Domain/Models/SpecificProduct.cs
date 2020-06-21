using System.Collections.Generic;

namespace CatalogApi.Domain.Models
{
    public class SpecificProduct
    {
        public string Id { get; set; }
        public int Stock { get; set; } = 0;
        public int ProductId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }

        public virtual Product Product { get; set; }
        public virtual Color Color { get; set; }
        public virtual Size Size { get; set; }
    }
}