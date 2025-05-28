namespace _2K_Matchmaker.WriteModels
{
    public class Message
    {

            public required string FromUserId { get; set; }
            public required string ToUserId { get; set; }
            public required string MessageText { get; set; }
        }
    }
