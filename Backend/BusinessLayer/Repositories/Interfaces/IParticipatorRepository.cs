using System.Threading.Tasks;
using CoreLayer.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BusinessLayer.Repositories.Interfaces
{
    public interface IParticipatorRepository
    {
        public Task<EntityEntry<Participator>> CreateParticipator(Participator participator);
    }
}