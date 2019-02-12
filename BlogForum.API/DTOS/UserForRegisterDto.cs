using System;
using System.ComponentModel.DataAnnotations;

namespace BlogForum.API.DTOS
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password must be between 4 and 8 characters.")]
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            CreatedAt = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}