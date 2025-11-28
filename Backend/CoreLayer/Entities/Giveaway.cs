namespace CoreLayer.Entities;

public class Giveaway : IBaseEntity
{
    public string Content { get; set; }
    public string[]? Winners { get; set; }
    public string[]? Substitutes { get; set; }
    public int NumberOfWinners { get; set; }
    public int NumberOfSubstitutes { get; set; }
    public bool IsActive { get; set; }

    public ICollection<Participator> Participators { get; set; } = new List<Participator>();
}