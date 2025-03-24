using _2K_Matchmaker.Database;
using _2K_Matchmaker.Models;
using Microsoft.EntityFrameworkCore;

namespace _2K_Matchmaker.QueryRepos
{
    public class SquadPostsQueryRepo :ISquadPostsQueryRepo
    {
        private readonly _2KMatchmakerDbContext _context;
        public SquadPostsQueryRepo(_2KMatchmakerDbContext context) {
            _context = context;
        }
        public async Task<IEnumerable<SquadPosts>> GetAllSquadPosts()
        {
            return await _context.Posts.ToListAsync();
        }
    }
}
