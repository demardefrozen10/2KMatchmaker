namespace _2K_Matchmaker.IQueryRepos
{
    public interface IMessageQueryRepo
    {
        public Task<IEnumerable<string>> GetMessageRecipientUsernames(string username);
    }
}
