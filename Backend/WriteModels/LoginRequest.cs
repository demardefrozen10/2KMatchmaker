namespace _2K_Matchmaker.WriteModels
{
    public class LoginRequest : IAuthRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
