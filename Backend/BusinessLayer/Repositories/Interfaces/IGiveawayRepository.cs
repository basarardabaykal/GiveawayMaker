using System.Threading.Tasks;
using CoreLayer.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BusinessLayer.Repositories.Interfaces
{
    public interface IGiveawayRepository
    {
        public Task<EntityEntry<Giveaway>> CreateGiveaway(Giveaway giveaway);
        public Task<Giveaway?> GetGiveawayById(Guid giveawayId);
        public Task<List<Participator>> GetAllParticipants(Guid giveawayId);
        public Task<bool> DeactivateGiveaway(Guid giveawayId);
        public Task<bool> UpdateGiveawayResults(Giveaway giveaway, IEnumerable<Participator> winners, IEnumerable<Participator> substitutes);
    }
}