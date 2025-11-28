using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Dtos;
using BusinessLayer.Services.Interfaces;
using BusinessLayer.Repositories.Interfaces;
using CoreLayer.Entities;
using CoreLayer.Utilities.DataResults.Concretes;
using CoreLayer.Utilities.DataResults.Interfaces;
using Microsoft.Extensions.Configuration;

namespace BusinessLayer.Services.Concretes
{
    public class GiveawayService : IGiveawayService
    {
        private readonly IGiveawayRepository _giveawayRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public GiveawayService(IGiveawayRepository giveawayRepository, IMapper mapper, IConfiguration configuration)
        {
            _giveawayRepository = giveawayRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<IDataResult<CreateGiveawayResponseDto>> CreateGiveaway(CreateGiveawayRequestDto requestDto)
        {
            var entity = _mapper.Map<Giveaway>(requestDto);
            var entityEntry = await _giveawayRepository.CreateGiveaway(entity);

            if (entityEntry.Entity == null)
            {
                return new ErrorDataResult<CreateGiveawayResponseDto>(500, "Failed to create giveaway.");
            }

            var baseDomain = _configuration.GetValue<string>("FRONTEND_URL");
 
            var participationURL = $"{baseDomain}/participate?giveawayId={entityEntry.Entity.Id}";

            var response = new CreateGiveawayResponseDto {
                GiveawayId = entityEntry.Entity.Id,
                ParticipationURL = participationURL
            };

            return new SuccessDataResult<CreateGiveawayResponseDto>("Giveaway created successfully.", response);
        }
    }
}