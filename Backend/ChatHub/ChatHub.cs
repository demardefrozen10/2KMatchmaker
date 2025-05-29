using _2K_Matchmaker.ICommandRepos;
using _2K_Matchmaker.Models;
using Microsoft.AspNetCore.SignalR;
using Message = _2K_Matchmaker.WriteModels.Message;


namespace _2K_Matchmaker.ChatHub
{
    public class ChatHub : Hub
    {
        private readonly IMessageCommandRepo _messageCommandRepo;

        public ChatHub(IMessageCommandRepo messageCommandRepo)
        {
            _messageCommandRepo = messageCommandRepo;
        }
        public async Task<Task> SendPrivateMessage(string targetUsername, string message)
        {
            var dbMessage = new Message
            {
                FromUsername = Context.UserIdentifier!,
                ToUsername = targetUsername,
                MessageText = message
            };

            await _messageCommandRepo.SaveMessage(dbMessage);

            return Clients.User(targetUsername).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.UserIdentifier;
            await base.OnConnectedAsync();
        }


    }
}
