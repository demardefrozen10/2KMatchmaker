﻿using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;

public interface ISquadPostsQueryRepo
{
    public Task<IEnumerable<ReadPost>> GetAllSquadPosts(String? gameMode, String? platform, int? playersNeeded, int? minWinPercentage);
    public Task<IEnumerable<ReadPost>?> GetSquadPostByUsername(String username);



}
