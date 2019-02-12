using System;

namespace BlogForum.API.DTOS
{
    public class PostToEditDto
    {
        public DateTime DateAdded { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public PostToEditDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}