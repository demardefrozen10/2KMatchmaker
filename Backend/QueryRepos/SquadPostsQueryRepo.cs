using _2K_Matchmaker.Database;
using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _2K_Matchmaker.QueryRepos
{
    public class SquadPostsQueryRepo :ISquadPostsQueryRepo
    {
        private readonly _2KMatchmakerDbContext _context;
        private readonly IMapper _mapper;
        public SquadPostsQueryRepo(_2KMatchmakerDbContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<SquadPosts>> GetAllSquadPosts()
        {
            var since = DateTime.UtcNow.AddHours(-24);
            return await _context.Posts
                                 .Where(p => p.createdAt >= since)
                                 .ToListAsync();
        }


        public async Task<IEnumerable<ReadPost>?> GetSquadPostByUsername(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.UserName == username);
            if (user == null) return null;

            var posts = await _context.Posts
                .Where(p => p.UserId == user.Id)
                .ToListAsync();

            var mappedPosts = _mapper.Map<IEnumerable<ReadPost>>(posts).ToList();

            foreach (var post in mappedPosts)
            {
                post.Username = username;
            }

            return mappedPosts;
        }


    }
}
