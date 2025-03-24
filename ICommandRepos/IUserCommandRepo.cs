using _2K_Matchmaker.Models;
using Microsoft.AspNetCore.Identity.Data;

public interface IUserCommandRepo
{
    public Task<User> CreateUser(_2K_Matchmaker.Models.RegisterRequest request);

    public Task<String?> AuthenticateUser(_2K_Matchmaker.Models.LoginRequest request);

    public TokenValidationResult ValidateToken(String token);
}
