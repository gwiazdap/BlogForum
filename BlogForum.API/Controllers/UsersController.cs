using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BlogForum.API.Data;
using BlogForum.API.DTOS;
using BlogForum.API.Helpers;
using BlogForum.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogForum.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IMapper _autoMapper;
        public UsersController(IBlogRepository blogRepository, IMapper autoMapper)
        {
            _autoMapper = autoMapper;
            _blogRepository = blogRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var users = await _blogRepository.GetUsers(userParams);

            var usersToReturn = _autoMapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        // [HttpGet("/search")]
        // public async Task<IActionResult> SearchUsers([FromQuery]UserParams userParams)
        // {
        //     var users = await _blogRepository.GetUsers(userParams);

        //     var usersToReturn = _autoMapper.Map<IEnumerable<UserForListDto>>(users);

        //     return Ok(usersToReturn);
        // }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _blogRepository.GetUser(id);

            var userToReturn = _autoMapper.Map<UserForListDto>(user);

            return Ok(userToReturn);
        }

        [HttpPost("{userId}/posts")]
        public async Task<IActionResult> CreatePost(int userId, PostDto postDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _blogRepository.GetUser(userId);

            postDto.UserId = userId;
            postDto.Username = user.Username;

            var post = _autoMapper.Map<Post>(postDto);

            _blogRepository.Add(post);

            await _blogRepository.SaveAll();


            return CreatedAtRoute("GetPost", new {controller = "Posts", id = post.Id},  postDto);
        }

        [HttpGet("{userId}/posts")]
        public async Task<IActionResult> GetUserPosts(int userId, [FromQuery]UserParams userParams)
        {
            var posts = await _blogRepository.GetUserPosts(userId, userParams);

            var postsToReturn = _autoMapper.Map<IEnumerable<PostDto>>(posts);

            Response.AddPagination(posts.CurrentPage, posts.PageSize, posts.TotalCount, posts.TotalPages);

            return Ok(posts);
        }

    }
}