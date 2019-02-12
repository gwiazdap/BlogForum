using System;
using System.Collections.Generic;
using BlogForum.API.Models;

namespace BlogForum.API.DTOS
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<PostDto> Posts { get; set; }
    }
}