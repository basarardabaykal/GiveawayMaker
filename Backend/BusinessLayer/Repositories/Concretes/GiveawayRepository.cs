using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Repositories.Interfaces;
using CoreLayer.Entities;
using DataLayer;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Giveaway?> GetGiveawayById(Guid giveawayId)
        {
            return await _dbContext.Giveaways
                .Include(g => g.Participators)
                .FirstOrDefaultAsync(g => g.Id == giveawayId);
        }

        public async Task<List<Participator>> GetAllParticipants(Guid giveawayId)
        {
            return await _dbContext.Participators
                .Where(p => p.GiveawayId == giveawayId)
                .ToListAsync();
        }

        public async Task<bool> DeactivateGiveaway(Guid giveawayId)
        {
            var entity = await _dbContext.Giveaways.FirstOrDefaultAsync(g => g.Id == giveawayId);
            if (entity == null) return false;
            entity.IsActive = false;
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateGiveawayResults(Giveaway giveaway, IEnumerable<Participator> winners, IEnumerable<Participator> substitutes)
        {
            giveaway.Winners = winners.Select(w => w.FullName).ToArray();
            giveaway.Substitutes = substitutes.Select(s => s.FullName).ToArray();

            foreach (var w in winners)
            {
                w.IsWinner = true;
            }

            _dbContext.Giveaways.Update(giveaway);
            _dbContext.Participators.UpdateRange(winners);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}