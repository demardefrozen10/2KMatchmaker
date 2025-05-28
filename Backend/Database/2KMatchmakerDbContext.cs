using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using _2K_Matchmaker.Models;
using _2K_Matchmaker.Entities;

namespace _2K_Matchmaker.Database
{
    public class _2KMatchmakerDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public IConfiguration _config { get; set; }

        public _2KMatchmakerDbContext(IConfiguration config)
        {
            _config = config;
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
        }

        public DbSet<SquadPosts> Posts { get; set; }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SquadPosts>()
                 .HasOne(sp => sp.User)
                 .WithMany(u => u.SquadPosts)
                 .HasForeignKey(sp => sp.UserId);

        }
    }
}
