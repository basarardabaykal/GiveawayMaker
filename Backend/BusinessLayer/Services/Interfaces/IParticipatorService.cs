using System.Threading.Tasks;
using BusinessLayer.Dtos;
using CoreLayer.Utilities.DataResults.Interfaces;

namespace BusinessLayer.Services.Interfaces
{
    public interface IParticipatorService
    {
        public Task<IDataResult<JoinGiveawayResponseDto>> JoinGiveaway(JoinGiveawayRequestDto requestDto);
    }
}