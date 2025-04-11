using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;
using AutoMapper;

namespace _2K_Matchmaker.Mappers
{
    public class SquadPostReadMapper : Profile
    {
        public SquadPostReadMapper() {
            CreateMap<SquadPosts, ReadPost>()
                .ForMember(dest => dest.DatePosted, opt => opt.MapFrom(src => src.createdAt));
        }
    }
}
