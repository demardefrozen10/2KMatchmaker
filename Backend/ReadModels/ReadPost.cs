namespace _2K_Matchmaker.ReadModels
{
    public class ReadPost
    {
        public required string GameMode { get; set; }
        public required string Platform { get; set; }
        public required int WinPercentage { get; set; }

        public required string Gamertag2K { get; set; }

        public string? Message { get; set; }

        public required string Username { get; set; }

        public Guid PostId { get; set; }

        public DateTime DatePosted { get; set; }

        public int playersNeeded { get; set; }

    }
}