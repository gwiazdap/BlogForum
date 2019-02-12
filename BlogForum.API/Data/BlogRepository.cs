using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogForum.API.Helpers;
using BlogForum.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogForum.API.Data
{
    public class BlogRepository : IBlogRepository
    {
        private readonly DataContext _dataContext;
        public BlogRepository(DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        public void Add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public Task<Comment> GetComment(int id)
        {
            var comment = _dataContext.Comment.FirstOrDefaultAsync(x => x.Id == id);

            return comment; 
        }

        public async Task<PagedList<Comment>> GetCommentsForPost(int postId, UserParams userParams)
        {
            var comments =  _dataContext.Comment.Where(x => x.PostId == postId);

            return await PagedList<Comment>.CreateAsync(comments, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<IEnumerable<Post>> GetNewestPosts()
        {
            var posts = await _dataContext.Posts.OrderByDescending(x => x.DateAdded).Take(3).ToListAsync();

            return posts;
        }

        public async Task<Post> GetPost(int id)
        {
            var post = await _dataContext.Posts.Include(c => c.Comments).FirstOrDefaultAsync(x => x.Id == id);

            return post;
        }

        public async Task<PagedList<Post>> GetPosts(UserParams userParams)
        {
            var posts = _dataContext.Posts.Include(c => c.Comments);

            return await PagedList<Post>.CreateAsync(posts, userParams.PageNumber, userParams.PageSize);
        }

        

        public async Task<User> GetUser(int id)
        {
            var user = await _dataContext.Users.Include(p => p.Posts).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<Post>> GetUserPosts(int userId, UserParams userParams)
        {
            var posts = _dataContext.Posts.Where(p => p.UserId == userId);

            return await PagedList<Post>.CreateAsync(posts, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _dataContext.Users.Include(p => p.Posts).Where(x => x.Username.Contains(userParams.Query));

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<User>> SearchUsers(string query)
        {
            var users = await _dataContext.Users.Where(x => x.Username.Contains(query)).ToListAsync();

            return users;
        }
    }
}