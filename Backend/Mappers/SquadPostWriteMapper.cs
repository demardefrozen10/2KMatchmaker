using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;
using _2K_Matchmaker.WriteModels;
using AutoMapper;

namespace _2K_Matchmaker.Mappers
{
    public class SquadPostWriteMapper : Profile
    {
        public SquadPostWriteMapper()
        {
            CreateMap<CreatePost, SquadPosts>();
        }
    }
}
