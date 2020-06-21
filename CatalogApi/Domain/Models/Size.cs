using System.Collections.Generic;

namespace CatalogApi.Domain.Models
{
    public class Size
    {
        public int Id { get; set; }
        public string SizeValue { get; set; }

        public virtual List<SpecificProduct> SpecificProducts { get; set; }
    }
}