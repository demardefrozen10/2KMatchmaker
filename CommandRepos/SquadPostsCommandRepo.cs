using _2K_Matchmaker.Database;
using _2K_Matchmaker.ICommandRepos;
using _2K_Matchmaker.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace _2K_Matchmaker.CommandRepos
{
    public class SquadPostsCommandRepo : ISquadPostsCommandRepo
    {
        private readonly _2KMatchmakerDbContext _context;
        public SquadPostsCommandRepo(_2KMatchmakerDbContext context)
        {
            _context = context;
        }

        public async Task<SquadPosts> CreatePost(SquadPosts post)
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<bool> DeletePost(Guid postId)
        {
            var post = await _context.Posts.FindAsync(postId);

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
