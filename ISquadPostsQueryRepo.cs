using _2K_Matchmaker.Models;

public interface ISquadPostsQueryRepo
{
    public Task<IEnumerable<SquadPosts>> GetAllSquadPosts();
}
