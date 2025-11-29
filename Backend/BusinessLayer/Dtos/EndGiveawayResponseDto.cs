using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Dtos
{
    public class EndGiveawayResponseDto
    {
        public string[] Winners { get; set; }
        public string[] Substitutes { get; set; }
    }
}