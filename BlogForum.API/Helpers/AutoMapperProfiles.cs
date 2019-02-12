using AutoMapper;
using BlogForum.API.DTOS;
using BlogForum.API.Models;

namespace BlogForum.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>();
            CreateMap<PostToEditDto, Post>();
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentDto, Comment>();
        }
    }
}