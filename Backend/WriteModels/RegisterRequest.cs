using Azure.Identity;
using System.ComponentModel.DataAnnotations;

namespace _2K_Matchmaker.WriteModels
{
    public class RegisterRequest : IAuthRequest
    {
        public required string Username { get; set; }

        public required string Password { get; set; }

        [EmailAddress]
        public required string Email { get; set; }
    }
}
