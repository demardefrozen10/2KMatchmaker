using _2K_Matchmaker.Entities;
using _2K_Matchmaker.Models;
using _2K_Matchmaker.ReadModels;
using AutoMapper;

namespace _2K_Matchmaker.Mappers
{
    public class MessageReadMapper : Profile
    {
        public MessageReadMapper()
        {
            CreateMap<Message, ReadMessage>()
                .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.SentAt, opt => opt.MapFrom(src => src.SentDate));
        }
    }
}
