using System.Threading.Tasks;
using BusinessLayer.Dtos;
using CoreLayer.Utilities.DataResults.Interfaces;

namespace BusinessLayer.Services.Interfaces
{
    public interface IGiveawayService
    {
        public Task<IDataResult<CreateGiveawayResponseDto>> CreateGiveaway(CreateGiveawayRequestDto requestDto);
    }
}