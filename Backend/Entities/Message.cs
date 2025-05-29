using _2K_Matchmaker.Models;

namespace _2K_Matchmaker.Entities
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public Guid RecipientId { get; set; }

        public required string Content { get; set; }

        public DateTime SentDate { get; set; }

    }
}
