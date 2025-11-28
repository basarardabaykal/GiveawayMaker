using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Dtos
{
    public class CreateGiveawayRequestDto
    {
        public string Content { get; set; }
        public int NumberOfWinners { get; set; }
        public int NumberOfSubstitutes { get; set; }
    }
}