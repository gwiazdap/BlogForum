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
    public class CommentsController : ControllerBase
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IMapper _autoMapper;
        public CommentsController(IBlogRepository blogRepository, IMapper autoMapper)
        {
            _autoMapper = autoMapper;
            _blogRepository = blogRepository;

        }
        [HttpGet("post/{postId}")]
        public async Task<IActionResult> GetCommentsForPost(int postId, [FromQuery]UserParams userParams)
        {
            var comments = await _blogRepository.GetCommentsForPost(postId, userParams);

            var commentsToReturn = _autoMapper.Map<IEnumerable<CommentDto>>(comments);

            Response.AddPagination(comments.CurrentPage, comments.PageSize, comments.TotalCount, comments.TotalPages);

            return Ok(commentsToReturn);
        }

        [HttpGet("{id}", Name = "GetComment")]
        public async Task<IActionResult> GetComment(int id)
        {
            var comment = await _blogRepository.GetComment(id);

            var commentToReturn = _autoMapper.Map<CommentDto>(comment);

            return Ok(commentToReturn);

        }

        [HttpPost("post/{postId}/user/{userId}")]
        public async Task<IActionResult> CreateComment(int postId, int userId, CommentDto commentToCreate)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _blogRepository.GetUser(userId);

            commentToCreate.UserId = userId;
            commentToCreate.PostId = postId;
            commentToCreate.Username = user.Username;

            var comment = _autoMapper.Map<Comment>(commentToCreate);

            _blogRepository.Add(comment);

            if (await _blogRepository.SaveAll())
                return CreatedAtRoute("GetComment", new {controller = "Comments", id = comment.Id},  commentToCreate);

            return BadRequest();
        }

        [HttpDelete("{id}/user/{userId}")]
        public async Task<IActionResult> DeleteComment(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var commentToDelete = await _blogRepository.GetComment(id);

            if (commentToDelete == null)
                return BadRequest("Comment does not exist");

            if (commentToDelete.UserId != userId)
                return Unauthorized();

            if (commentToDelete != null)
                _blogRepository.Delete(commentToDelete);

            if (await _blogRepository.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the comment.");
        }


    }
}