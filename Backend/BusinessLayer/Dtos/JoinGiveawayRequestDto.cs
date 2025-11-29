using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer.Dtos
{
    public class JoinGiveawayRequestDto
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string FingerPrintId { get; set; }
        public string IpAddress { get; set; }
        public string AuthProvider { get; set; }
        public string ProviderUserId { get; set; }
        public Guid GiveawayId { get; set; }
    }
}