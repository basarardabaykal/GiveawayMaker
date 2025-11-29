namespace CoreLayer.Entities;

public class Participator : IBaseEntity
{
    public string FullName { get; set; }
    public string PhoneNumber { get; set; }
    public string FingerPrintId { get; set; }
    public string IpAddress { get; set; }
    public string AuthProvider { get; set; }
    public string ProviderUserId { get; set; }
    public bool IsWinner { get; set; }
    public Guid GiveawayId { get; set; } // Foreign Key referencing Giveaway relation
    public Giveaway Giveaway { get; set; } // Foreign Reference
}