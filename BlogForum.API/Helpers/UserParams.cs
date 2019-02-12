namespace BlogForum.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public string Query { get; set; } = "";
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
    }
        
}