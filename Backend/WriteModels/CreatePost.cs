namespace _2K_Matchmaker.WriteModels
{
    public class CreatePost
    {
        public required string GameMode { get; set; }
        public required string Platform { get; set; }
        public required int WinPercentage { get; set; }

        public required string Gamertag2K { get; set; }

        public string? Message { get; set; }

        public required string Username { get; set; }

    }
}
