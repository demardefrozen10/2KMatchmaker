using _2K_Matchmaker.Models;
using Microsoft.AspNetCore.SignalR;
using Message = _2K_Matchmaker.WriteModels.Message;


namespace _2K_Matchmaker.ChatHub
{
    public class ChatHub : Hub
    {
        public async Task<Task> SendPrivateMessage(string targetUsername, string message)
        {

            return Clients.User(targetUsername).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.UserIdentifier;
            Console.WriteLine($"✅ User connected to SignalR: {userId}");
            await base.OnConnectedAsync();
        }


    }
}
