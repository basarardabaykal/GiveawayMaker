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

        public async Task<IDataResult<EndGiveawayResponseDto>> EndGiveaway(EndGiveawayRequestDto requestDto)
        {
            var giveaway = await _giveawayRepository.GetGiveawayById(requestDto.GiveawayId);
            if (giveaway == null) 
            {
                return new ErrorDataResult<EndGiveawayResponseDto>(404, "Giveaway not found.");
            }

            var participants = await _giveawayRepository.GetAllParticipants(requestDto.GiveawayId);
            if (participants == null || participants.Count < (giveaway.NumberOfWinners + giveaway.NumberOfSubstitutes))
            {
                return new ErrorDataResult<EndGiveawayResponseDto>(404, "Not enough participants found for this giveaway.");
            }

            // Randomly select winners and substitutes
            var rng = new Random();
            var shuffled = participants.OrderBy(_ => rng.Next()).ToList();
            var winnerCount = giveaway.NumberOfWinners;
            var substituteCount = giveaway.NumberOfSubstitutes;
            var selectedWinners = shuffled.Take(winnerCount).ToList();
            var selectedSubstitutes = shuffled.Skip(winnerCount).Take(substituteCount).ToList();

            var saved = await _giveawayRepository.UpdateGiveawayResults(giveaway, selectedWinners, selectedSubstitutes);
            if (!saved)
            {
                return new ErrorDataResult<EndGiveawayResponseDto>(500, "Failed to save giveaway results.");
            }

            await _giveawayRepository.DeactivateGiveaway(requestDto.GiveawayId);

            var response = new EndGiveawayResponseDto
            {
                Winners = selectedWinners.Select(p => $"{p.FullName} - {p.PhoneNumber}").ToArray(),
                Substitutes = selectedSubstitutes.Select(p => $"{p.FullName} - {p.PhoneNumber}").ToArray()
            };

            return new SuccessDataResult<EndGiveawayResponseDto>("Giveaway ended successfully.", response);
        }
    }
}
