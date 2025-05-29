using _2K_Matchmaker.Database;
using _2K_Matchmaker.Entities;
using _2K_Matchmaker.ICommandRepos;
using _2K_Matchmaker.Models;
using _2K_Matchmaker.WriteModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace _2K_Matchmaker.CommandRepos
{
    public class MessageCommandRepo : IMessageCommandRepo
    {
        private readonly _2KMatchmakerDbContext _dbContext;

        public MessageCommandRepo(_2KMatchmakerDbContext context)
        {
            _dbContext = context;
        }

        public async Task<Entities.Message> SaveMessage(WriteModels.Message message)
        {
            var fromUser = await GetUser(message.FromUsername);

            var toUser = await GetUser(message.ToUsername);

            var mappedMessage = new Entities.Message
            {
                Id = Guid.NewGuid(),
                RecipientId = toUser!.Id,
                SenderId = fromUser!.Id,
                Content = message.MessageText,
                SentDate = DateTime.UtcNow
            };


            await _dbContext.AddAsync(mappedMessage);

            await _dbContext.SaveChangesAsync();

            return mappedMessage;
            
        }

        private async Task<User?> GetUser(string Username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(p => p.UserName == Username);

            if (user == null)
            {
                return null;
            }

            return user;
        }
    }
}
