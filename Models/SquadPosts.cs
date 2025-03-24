using System.ComponentModel.DataAnnotations;

namespace _2K_Matchmaker.Models
{
    public class SquadPosts
    {
        [Key]
        public required Guid PostId { get; set; }

        public required String GameMode { get; set; }

        public required String Platform { get; set; }

        public required String Build { get; set; }

        public required String LookingForBuild { get; set; }

        public required int WinPercentage { get; set; }

        public required String Message { get; set; }


    }
}
