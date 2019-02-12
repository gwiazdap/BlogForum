using System;
using System.ComponentModel.DataAnnotations;

namespace BlogForum.API.DTOS
{
    public class CommentDto
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        [Required]
        public string Content { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public int PostId { get; set; }
        
        public CommentDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}