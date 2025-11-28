using AutoMapper;
using BusinessLayer.Dtos;
using CoreLayer.Entities;

namespace BusinessLayer.Profiles
{
    public class GiveawayProfile : Profile
    {
        public GiveawayProfile()
        {
            CreateMap<CreateGiveawayRequestDto, Giveaway>();
        }
    }
}