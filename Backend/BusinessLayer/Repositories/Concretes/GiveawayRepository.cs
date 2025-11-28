using System.Threading.Tasks;
using BusinessLayer.Repositories.Interfaces;
using CoreLayer.Entities;
using DataLayer;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BusinessLayer.Repositories.Concretes
{
    public class GiveawayRepository : IGiveawayRepository
    {
        private readonly AppDbContext _dbContext;
        public GiveawayRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<EntityEntry<Giveaway>> CreateGiveaway(Giveaway giveaway)
        {
            var result = await _dbContext.Giveaways.AddAsync(giveaway);
            await _dbContext.SaveChangesAsync();
            return result;
        }
    }
}