using AutoMapper;
using BusinessLayer.Dtos;
using CoreLayer.Entities;

namespace BusinessLayer.Profiles
{
    public class ParticipatorProfile : Profile
    {
        public ParticipatorProfile()
        {
            CreateMap<JoinGiveawayRequestDto, Participator>();
        }
    }
}
