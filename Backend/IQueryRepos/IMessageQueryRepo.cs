using _2K_Matchmaker.ReadModels;

namespace _2K_Matchmaker.IQueryRepos
{
    public interface IMessageQueryRepo
    {
        public Task<IEnumerable<string>> GetMessageRecipientUsernames(string username);

        public Task<IEnumerable<ReadMessage>> GetMessageHistoryByRecipientUsername(string recipientUsername, string senderUsername);
    }
}
