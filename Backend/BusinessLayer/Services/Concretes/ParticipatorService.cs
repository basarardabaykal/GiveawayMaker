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
    public class ParticipatorService : IParticipatorService
    {
        private readonly IParticipatorRepository _participatorRepository;
        private readonly IGiveawayRepository _giveawayRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public ParticipatorService(IParticipatorRepository participatorRepository, IGiveawayRepository giveawayRepository, IMapper mapper, IConfiguration configuration)
        {
            _participatorRepository = participatorRepository;
            _giveawayRepository = giveawayRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<IDataResult<JoinGiveawayResponseDto>> JoinGiveaway(JoinGiveawayRequestDto requestDto)
        {
            var giveaway = await _giveawayRepository.GetGiveawayById(requestDto.GiveawayId);
            if (giveaway == null)
            {
                return new ErrorDataResult<JoinGiveawayResponseDto>(404, "Giveaway not found.");
            }

            if (!giveaway.IsActive)
            {
                return new ErrorDataResult<JoinGiveawayResponseDto>(400, "This giveaway is deactivated. Joining is not allowed.");
            }

            var entity = _mapper.Map<Participator>(requestDto);
            var entityEntry = await _participatorRepository.CreateParticipator(entity);

            if (entityEntry.Entity == null)
            {
                return new ErrorDataResult<JoinGiveawayResponseDto>(500, "Failed to create participator.");
            }

            var response = new JoinGiveawayResponseDto {
                JoinedAt = entityEntry.Entity.CreatedAt
            };

            return new SuccessDataResult<JoinGiveawayResponseDto>("Participator created successfully.", response);
        }
    }
}