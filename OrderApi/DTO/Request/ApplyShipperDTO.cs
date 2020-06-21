using System.Collections.Generic;
namespace OrderApi.DTO.Request
{
    public class ApplyShipperDTO
    {
        public string ShipperId { get; set; }
        public List<int> OrderIds { get; set; }
    }
}