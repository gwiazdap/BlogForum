using System.Collections.Generic;
using System.Threading.Tasks;
using BlogForum.API.Helpers;
using BlogForum.API.Models;

namespace BlogForum.API.Data
{
    public interface IBlogRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<Post>> GetPosts(UserParams userParams);
         Task<IEnumerable<Post>> GetNewestPosts();
         Task<Post> GetPost(int id);
         Task<Comment> GetComment(int id);
         Task<PagedList<Post>> GetUserPosts(int userId, UserParams userParams);
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<IEnumerable<User>> SearchUsers(string query);
         Task<PagedList<Comment>> GetCommentsForPost(int postId, UserParams userParams);
         Task<User> GetUser(int id);
    }
}