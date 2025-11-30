using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Dtos;
using BusinessLayer.Services.Interfaces;
using BusinessLayer.Repositories.Interfaces;
using CoreLayer.Entities;
using CoreLayer.Utilities.DataResults.Concretes;
using CoreLayer.Utilities.DataResults.Interfaces;
using Microsoft.Extensions.Configuration;
using FluentValidation;
using BusinessLayer.Validations;
using PhoneNumbers;

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
            var validator = new JoinGiveawayRequestDtoValidator();
            var validationResult = validator.Validate(requestDto);
            if (!validationResult.IsValid)
            {
                var msg = string.Join(" ", validationResult.Errors.Select(e => e.ErrorMessage));
                return new ErrorDataResult<JoinGiveawayResponseDto>(400, msg);
            }

            var giveaway = await _giveawayRepository.GetGiveawayById(requestDto.GiveawayId);
            if (giveaway == null)
            {
                return new ErrorDataResult<JoinGiveawayResponseDto>(404, "Giveaway not found.");
            }

            if (!giveaway.IsActive)
            {
                return new ErrorDataResult<JoinGiveawayResponseDto>(400, "This giveaway is deactivated. Joining is not allowed.");
            }

            string normalizedPhone = requestDto.PhoneNumber;
            try
            {
                var util = PhoneNumberUtil.GetInstance();
                var raw = normalizedPhone?.Trim() ?? string.Empty;
                if (!raw.StartsWith("+")) raw = "+" + raw;
                var parsed = util.Parse(raw, "ZZ");
                normalizedPhone = util.Format(parsed, PhoneNumberFormat.E164);
            }
            catch
            {
            }

            var phoneExists = await _participatorRepository.ExistsByPhone(requestDto.GiveawayId, normalizedPhone);
            if (phoneExists)
            {
                return new ErrorDataResult<JoinGiveawayResponseDto>(409, "This phone number has already joined this giveaway.");
            }

            var entity = _mapper.Map<Participator>(requestDto);
            entity.PhoneNumber = normalizedPhone;
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