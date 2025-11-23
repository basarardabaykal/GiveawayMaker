namespace CoreLayer.Entities;

public class Giveaway
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    public string[]? Winners { get; set; }
    public string[]? Substitutes { get; set; }
    public int NumberOfWinners { get; set; }
    public int NumberOfSubstitutes { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    
    ICollection<Participator> Participators { get; set; } // Foreign reference
}