using System.Threading.Tasks;
using BusinessLayer.Repositories.Interfaces;
using CoreLayer.Entities;
using DataLayer;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BusinessLayer.Repositories.Concretes
{
    public class ParticipatorRepository : IParticipatorRepository
    {
        private readonly AppDbContext _dbContext;
        public ParticipatorRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<EntityEntry<Participator>> CreateParticipator(Participator participator)
        {
            var result = await _dbContext.Participators.AddAsync(participator);
            await _dbContext.SaveChangesAsync();
            return result;
        }
    }
}