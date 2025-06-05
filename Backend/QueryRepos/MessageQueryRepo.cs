using _2K_Matchmaker.Database;
using _2K_Matchmaker.IQueryRepos;
using _2K_Matchmaker.ReadModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _2K_Matchmaker.QueryRepos
{
    public class MessageQueryRepo : IMessageQueryRepo
    {
        private readonly _2KMatchmakerDbContext _context;
        private readonly IMapper _mapper;
        public MessageQueryRepo(_2KMatchmakerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<string>> GetMessageRecipientUsernames(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.UserName == username);

            if (user == null)
            {
                return Enumerable.Empty<string>();
            }
            var usernames = await _context.Messages
                .Where(m => m.SenderId == user.Id || m.RecipientId == user.Id) 
                .Select(m => m.SenderId == user.Id ? m.RecipientId : m.SenderId) 
                .Distinct()
                .Join(_context.Users, otherUserId => otherUserId, u => u.Id, (otherUserId, u) => u.UserName)
                .Where(username => username != user.UserName)
                .ToListAsync();


            return usernames!;
        }

        public async Task<IEnumerable<ReadMessage>> GetMessageHistoryByRecipientUsername(string fromUsername, string toUsername)
        {
            var fromUser = await _context.Users.FirstOrDefaultAsync(p => p.UserName == fromUsername);
            var toUser = await _context.Users.FirstOrDefaultAsync(p => p.UserName == toUsername);

            if (fromUser == null || toUser == null)
            {
                return Enumerable.Empty<ReadMessage>();
            }

            var sentMessages = await _context.Messages.Where(p => p.SenderId == fromUser.Id && p.RecipientId == toUser.Id).ToListAsync();

            var recievedMessages = await _context.Messages.Where(p => p.RecipientId == fromUser.Id && p.SenderId == toUser.Id).ToListAsync();


            var mappedSentMessages = _mapper.Map<IEnumerable<ReadMessage>>(sentMessages);
            foreach (var message in mappedSentMessages)
            {
                message.IsSent = true; // Ensure IsSent is true for sent messages
            }

            var mappedReceivedMessages = _mapper.Map<IEnumerable<ReadMessage>>(recievedMessages);
            foreach (var message in mappedReceivedMessages)
            {
                message.IsSent = false;
            }

            var mappedMessages = mappedSentMessages.Concat(mappedReceivedMessages).OrderByDescending(m => m.SentAt);


            return mappedMessages;

        }



    }
}
