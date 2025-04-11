using _2K_Matchmaker.Database;
using _2K_Matchmaker.ICommandRepos;
using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;
using _2K_Matchmaker.WriteModels;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace _2K_Matchmaker.CommandRepos
{
    public class SquadPostsCommandRepo : ISquadPostsCommandRepo
    {
        private readonly _2KMatchmakerDbContext _context;
        private readonly IMapper _mapper;
        public SquadPostsCommandRepo(_2KMatchmakerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ReadPost?> CreatePost(CreatePost post)
        {
            var userId = await _context.Users.FirstOrDefaultAsync(u => u.UserName == post.Username);

            if (userId == null) return null;

            var mappedPost = _mapper.Map<SquadPosts>(post);

            mappedPost.User = userId;
            mappedPost.UserId = userId.Id;
            mappedPost.PostId = Guid.NewGuid();
            mappedPost.createdAt = DateTime.UtcNow;

            await _context.Posts.AddAsync(mappedPost);
            await _context.SaveChangesAsync();

            
            return _mapper.Map<ReadPost>(mappedPost);
        }

        public async Task<bool> DeletePost(Guid postId)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(u => u.PostId == postId);

            if (post == null)
            {
                return false;
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return true;
        }


    }
}
