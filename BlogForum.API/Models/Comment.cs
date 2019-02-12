using System;

namespace BlogForum.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public string Content { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
    }
}