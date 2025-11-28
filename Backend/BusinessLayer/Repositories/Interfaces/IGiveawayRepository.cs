using System.Threading.Tasks;
using CoreLayer.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BusinessLayer.Repositories.Interfaces
{
    public interface IGiveawayRepository
    {
        public Task<EntityEntry<Giveaway>> CreateGiveaway(Giveaway giveaway);
    }
}