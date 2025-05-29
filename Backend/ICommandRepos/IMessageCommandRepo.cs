using _2K_Matchmaker.WriteModels;

namespace _2K_Matchmaker.ICommandRepos
{
    public interface IMessageCommandRepo
    {
        public Task<Entities.Message> SaveMessage(Message message);
    }
}
