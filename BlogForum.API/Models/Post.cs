using System;
using System.Collections.Generic;

namespace BlogForum.API.Models
{
    public class Post
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}