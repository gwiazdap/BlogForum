using BlogForum.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogForum.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comment { get; set; }
    }
    
}