using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;

public interface ISquadPostsQueryRepo
{
    public Task<IEnumerable<SquadPosts>> GetAllSquadPosts();
    public Task<IEnumerable<ReadPost>?> GetSquadPostByUsername(String username);



}
