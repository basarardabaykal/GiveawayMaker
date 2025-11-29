using CoreLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Giveaway> Giveaways { get; set; }
    public DbSet<Participator> Participators { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Giveaway>(entity =>
        {
            entity.HasKey(g => g.Id);
            entity.Property(g => g.Content).IsRequired();
            entity.Property(g => g.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(g => g.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasMany<Participator>()
                .WithOne(p => p.Giveaway)
                .HasForeignKey(p => p.GiveawayId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Participator>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.FullName).IsRequired();
            entity.Property(p => p.PhoneNumber).IsRequired();
            entity.Property(p => p.FingerPrintId).IsRequired();
            entity.Property(p => p.IpAddress).IsRequired();
            entity.Property(p => p.AuthProvider).IsRequired();
            entity.Property(p => p.ProviderUserId).IsRequired();
            entity.Property(p => p.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(p => p.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }
    
    private void UpdateTimestamps()
    {
        var now = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries<IBaseEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                if (entry.Entity.CreatedAt == default)
                {
                    entry.Entity.CreatedAt = now;
                }
                entry.Entity.UpdatedAt = now;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Property(e => e.CreatedAt).IsModified = false;
                entry.Entity.UpdatedAt = now;
            }
        }
    }
}
