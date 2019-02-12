using System.Collections.Generic;
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
    public class PostsController : ControllerBase
    {
        private readonly IMapper _autoMapper;
        private readonly IBlogRepository _blogRepository;
        public PostsController(IBlogRepository blogRepository, IMapper autoMapper)
        {
            _blogRepository = blogRepository;
            _autoMapper = autoMapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery]UserParams userParams)
        {
            var posts = await _blogRepository.GetPosts(userParams);

            var postsToReturn = _autoMapper.Map<IEnumerable<PostDto>>(posts);

            Response.AddPagination(posts.CurrentPage, posts.PageSize, posts.TotalCount, posts.TotalPages);

            return Ok(postsToReturn);
        }

        [HttpGet("newests")]
        public async Task<IActionResult> GetNewestPosts()
        {
            var posts = await _blogRepository.GetNewestPosts();

            var postsToReturn = _autoMapper.Map<IEnumerable<PostDto>>(posts);

            return Ok(postsToReturn);
        }

        [HttpGet("{id}", Name="GetPost")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _blogRepository.GetPost(id);

            var postToReturn = _autoMapper.Map<PostDto>(post);

            return Ok(postToReturn);
        }

        [HttpPut("{id}/user/{userId}")]
        public async Task<IActionResult> EditPost(int userId, int id, PostToEditDto postToEdit)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var postFromRepo = await _blogRepository.GetPost(id);

            if (postFromRepo == null)
                return BadRequest();

            if (postFromRepo.UserId != userId)
                return Unauthorized();

            _autoMapper.Map(postToEdit, postFromRepo);

            if (await _blogRepository.SaveAll())
                return NoContent();

            return BadRequest("Failed to edit the post");
            
        }

        [HttpDelete("{id}/user/{userId}")]
        public async Task<IActionResult> DeletePost(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var postToDelete = await _blogRepository.GetPost(id);

            if (postToDelete == null)
                return BadRequest("Post does not exist.");

            if (postToDelete.UserId != userId)
                return Unauthorized();

            if (postToDelete != null)
                _blogRepository.Delete(postToDelete);

            if (await _blogRepository.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the post because");
        }

    }
}