using System.ComponentModel.DataAnnotations;

namespace _2K_Matchmaker.Models
{
    public class SquadPosts
    {
        [Key]
        public required Guid PostId { get; set; }
        public required String GameMode { get; set; }
        public required String Platform { get; set; }
        public required int WinPercentage { get; set; }

        public required String Gamertag2K { get; set; }

        public required String Message { get; set; }

        public required User User { get; set; }

        public required Guid UserId { get; set; }
        public int Overall { get; set; }

        public DateTime createdAt { get; set; }


    }
}
