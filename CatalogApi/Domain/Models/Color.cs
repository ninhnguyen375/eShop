using System.Collections.Generic;

namespace CatalogApi.Domain.Models
{
    public class Color
    {
        public int Id { get; set; }
        public string HexCode { get; set; }

        public virtual List<SpecificProduct> SpecificProducts { get; set; }
        public virtual List<Image> Images { get; set; }
    }
}