using _2K_Matchmaker.ReadModels;
using _2K_Matchmaker.WriteModels;

namespace _2K_Matchmaker.ICommandRepos
{
    public interface ISquadPostsCommandRepo
    {
        public Task<ReadPost?> CreatePost(CreatePost post);

        public Task<bool> DeletePost(Guid postId);

    }
}
