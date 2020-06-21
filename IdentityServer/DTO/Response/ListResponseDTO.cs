using System.Collections.Generic;

namespace IdentityServer.DTO.Response
{
    public class ListResponseDTO
    {
        public IEnumerable<object> Data { get; set; }
        public int Current { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public int Total { get; set; }
        public int TotalPage { get; set; }
    }
}