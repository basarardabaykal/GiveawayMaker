using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Dtos
{
    public class CreateGiveawayResponseDto
    {
        public Guid GiveawayId { get; set;}
        public string ParticipationURL { get; set; }
    }
}