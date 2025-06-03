using _2K_Matchmaker.Database;
using _2K_Matchmaker.IQueryRepos;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _2K_Matchmaker.QueryRepos
{
    public class MessageQueryRepo : IMessageQueryRepo
    {
        private readonly _2KMatchmakerDbContext _context;
        public MessageQueryRepo(_2KMatchmakerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<string>> GetMessageRecipientUsernames(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.UserName == username);

            if (user == null)
            {
                return Enumerable.Empty<string>();
            }

            var usernames = await _context.Messages
                .Where(m => m.SenderId == user.Id)
                .Select(m => m.RecipientId)
                .Distinct()
                .Join(_context.Users, recipientId => recipientId, u => u.Id, (recipientId, u) => u.UserName)
                .ToListAsync();

            return usernames!;
        }


    }
}
