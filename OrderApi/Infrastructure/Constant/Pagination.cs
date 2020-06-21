namespace OrderApi.Infrastructure.Constant
{
    public class Pagination
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        public string SortAsc { get; set; }
        public string SortDesc { get; set; }


        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}