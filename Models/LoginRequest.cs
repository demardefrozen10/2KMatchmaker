namespace _2K_Matchmaker.Models
{
    public class LoginRequest : IAuthRequest
    {
        public required String Username { get; set; }
        public required String Password { get; set; }
    }
}
