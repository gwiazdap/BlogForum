using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using BlogForum.API.Models;

namespace BlogForum.API.DTOS
{
    public class PostDto
    {        
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public ICollection<CommentDto> Comments { get; set; }

        public PostDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}