using System.Collections.Generic;
namespace OrderApi.DTO.Request
{
    public class SearchOrder
    {
        public string UserId { get; set; }
        public string ShipperId { get; set; }
        public string Status { get; set; }
        public List<string> SelectStatus { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
    }
}