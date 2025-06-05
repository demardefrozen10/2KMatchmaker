namespace _2K_Matchmaker.ReadModels
{
    public class ReadMessage
    {
        public required string Message { get; set; }

        public required DateTime SentAt { get; set; }

        public Boolean IsSent { get; set; } // True if the user sent it, false if no
    }
}
