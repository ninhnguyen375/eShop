using System.Collections.Generic;

namespace OrderApi.DTO.Response
{
    public class ListResponseDTO
    {
        public IEnumerable<object> Data { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public int TotalCount { get; set; }
        public int TotalPage { get; set; }
    }
}