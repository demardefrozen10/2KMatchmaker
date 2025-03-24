using _2K_Matchmaker.Models;

namespace _2K_Matchmaker.ICommandRepos
{
    public interface ISquadPostsCommandRepo
    {
        public Task<SquadPosts> CreatePost(SquadPosts post);

        public Task<bool> DeletePost(Guid postId);

    }
}
